import type { FtpConfig as FtpConfigType } from "@prisma/client";
import pkg from "@prisma/client";
const { Protocol } = pkg;
import * as ftp from "basic-ftp";
import * as fs from "fs";
import { encrypt, decrypt } from "../utils/crypto.server";

export class FtpService {
  private client: ftp.Client;

  constructor() {
    this.client = new ftp.Client(10000); // 10-second timeout
    this.client.ftp.verbose = true; // Enable verbose logging
  }

  private async connect(config: FtpConfigType, isPasswordEncrypted = true) {
    console.log("Attempting to connect to FTP server...");
    try {
      const password = isPasswordEncrypted ? decrypt(config.password) : config.password;
      
      await this.client.access({
        host: config.host,
        port: config.port,
        user: config.username,
        password: password,
        secure: config.protocol === Protocol.SFTP,
        secureOptions: config.protocol === Protocol.SFTP ? {
          rejectUnauthorized: false
        } : undefined
      });

      console.log("FTP access successful.");

      if (config.passiveMode) {
        // Correct way to enter passive mode is often handled by the library automatically
        // or might be a setting in the access options. `basic-ftp` handles this.
        // Let's assume the library handles it or we can add a specific option if needed.
        // No direct `enterPassive` method exists on the client object itself.
      }

      return true;
    } catch (error: any) {
      console.error("FTP Connection error in connect():", error);
      throw new Error(`Failed to connect to FTP server: ${error.message}`);
    }
  }

  async testConnection(config: FtpConfigType): Promise<boolean> {
    console.log("Testing FTP connection...");
    try {
      await this.connect(config, false);
      console.log("Connection successful, checking directory...");
      await this.client.pwd();
      console.log("Directory check successful. Test passed.");
      return true;
    } catch (error) {
      console.error("FTP testConnection failed:", error);
      return false;
    } finally {
      console.log("Closing FTP client.");
      this.client.close();
    }
  }

  async uploadFile(config: FtpConfigType, localPath: string, remotePath: string): Promise<boolean> {
    try {
      await this.connect(config, true);
      
      // Ensure the remote directory exists
      const directory = remotePath.substring(0, remotePath.lastIndexOf("/"));
      if (directory) {
        try {
          await this.client.ensureDir(directory);
        } catch (error) {
          console.warn("Directory creation failed:", error);
        }
      }

      // Upload the file
      await this.client.uploadFrom(localPath, remotePath);
      return true;
    } catch (error: any) {
      console.error("FTP Upload error:", error);
      throw new Error(`Failed to upload file to FTP server: ${error.message}`);
    } finally {
      this.client.close();
    }
  }

  async validateConfig(config: Partial<FtpConfigType>): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!config.host) errors.push("Host is required");
    if (!config.username) errors.push("Username is required");
    if (!config.password) errors.push("Password is required");
    if (config.port && (config.port < 1 || config.port > 65535)) {
      errors.push("Port must be between 1 and 65535");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create singleton instance
const ftpService = new FtpService();
export default ftpService; 