import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  TextField,
  Icon,
  Button,
  InlineStack,
  BlockStack,
  Select,
  DatePicker,
  DataTable
} from "@shopify/polaris";
import { HomeIcon, SearchIcon, FolderIcon, EditIcon, CalendarIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import { useState, useMemo, useCallback } from "react";
import { prisma } from "../db.server"; // Import prisma

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  // Fetch reports for the current shop
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    select: { id: true },
  });

  if (!shop) {
    // Handle case where shop is not found (should not happen in a typical flow)
    return json({ allReports: [] });
  }

  const allReports = await prisma.report.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" }, // Order by creation date, newest first
  });

  // Convert Date objects to ISO strings for consistent handling in the client
  const serializableReports = allReports.map(report => ({
    ...report,
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
    // Ensure other Date fields like startDate, endDate are also converted if present and used
    startDate: report.startDate?.toISOString() || null,
    endDate: report.endDate?.toISOString() || null,
  }));

  return json({ allReports: serializableReports });
};

export default function DashboardPage() {
  const { allReports } = useLoaderData<typeof loader>();

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // State for filters
  // Initialize with a default date range (e.g., current month)
  const today = new Date();
  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [filterDates, setFilterDates] = useState<{
    start: Date;
    end: Date;
  }>({ start: firstDayOfCurrentMonth, end: lastDayOfCurrentMonth });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customerFilter, setCustomerFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleMonthChange = useCallback((month: number, year: number) => {
    // Update the state with the first and last day of the selected month
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    setFilterDates({ start, end });
  }, []);

  const handleDateSelection = useCallback(({ start, end }: { start: Date, end: Date }) => {
    setFilterDates({ start, end });
    setShowDatePicker(false);
  }, []);

  const handleCustomerFilterChange = useCallback((value: string) => setCustomerFilter(value), []);
  const handleProductFilterChange = useCallback((value: string) => setProductFilter(value), []);
  const handleStatusFilterChange = useCallback((value: string) => setStatusFilter(value), []);

  // Dummy options for filters (replace with actual data)
  const customerOptions = useMemo(() => [
    { label: "All Customers", value: "" },
    { label: "Customer A", value: "customerA" },
    { label: "Customer B", value: "customerB" },
  ], []);

  const productOptions = useMemo(() => [
    { label: "All Products", value: "" },
    { label: "Product X", value: "productX" },
    { label: "Product Y", value: "productY" },
  ], []);

  const statusOptions = useMemo(() => [
    { label: "All Statuses", value: "" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Failed", value: "FAILED" },
  ], []);

  // Filter reports based on state
  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      // Use available fields for filtering
      const reportType = report.type || '';
      const reportStatus = report.status || '';
      const reportFormat = report.format || '';

      // Convert ISO strings back to Date objects for date comparison
      const reportCreatedDate = report.createdAt ? new Date(report.createdAt) : null;

      // Derive a searchable name (e.g., combining type and date range)
      const derivedReportName = `${reportType} ${report.startDate ? new Date(report.startDate).toLocaleDateString() : ''} - ${report.endDate ? new Date(report.endDate).toLocaleDateString() : ''} ${reportFormat}`.toLowerCase();

      // Filter by search query (case-insensitive)
      const matchesSearch = derivedReportName.includes(searchQuery.toLowerCase()) ||
                          reportType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reportStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reportFormat.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by date range (using createdAt)
      const matchesDateRange = (!filterDates.start || (reportCreatedDate && reportCreatedDate >= filterDates.start)) &&
                             (!filterDates.end || (reportCreatedDate && reportCreatedDate <= filterDates.end));

      // Filter by status
      const matchesStatus = !statusFilter || reportStatus === statusFilter;

      // Combine all filters. Customer and Product filters are excluded as fields are not on Report model.
      return matchesSearch && matchesDateRange && matchesStatus;
    });
  }, [searchQuery, filterDates, statusFilter, allReports]);

  // Map filtered reports data to DataTable rows
  const rows = useMemo(() => filteredReports.map(report => [
    // Use fileName for Report Name
    report.fileName || 'Unnamed Report',
    report.type || '',
    // Format dates for display, handle potential nulls
    report.createdAt ? new Date(report.createdAt).toLocaleDateString() : '',
    report.updatedAt ? new Date(report.updatedAt).toLocaleDateString() : '',
    // Derive Schedule Type for display (using report.type)
    report.type === 'scheduled' ? 'Scheduled' : 'None',
    // Actions column with placeholder icons
    <InlineStack gap="200">
      {/* TODO: Implement actual scheduling and edit actions */}
      {/* Disable schedule button for manual reports */}
      <Button variant="plain" icon={CalendarIcon} accessibilityLabel="Schedule report" disabled={report.type === 'manual'} />
      <Button variant="plain" icon={EditIcon} accessibilityLabel="Edit report" />
    </InlineStack>,
  ]), [filteredReports]);

  const headings = useMemo(() => [
    'Report Name',
    'Report Type',
    'Created on',
    'Updated on',
    'Schedule Type',
    'Actions',
  ], []);

  // TODO: Implement Summary View data fetching

  return (
    <Page>
      <Layout>
        {/* Header */}
        <Layout.Section>
          <InlineStack gap="400">
            <Text variant="headingLg" as="h1" fontWeight="bold">
              DASHBOARD
            </Text>
          </InlineStack>
        </Layout.Section>

        {/* Summary View */}
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text variant="headingMd" as="h2">Summary</Text>
              <InlineStack gap="500">
                <BlockStack gap="100">
                  <Text variant="bodyMd" as="p" fontWeight="bold">Total Exports:</Text>
                  <Text variant="bodyMd" as="p">{/* TODO: Fetch total exports */ allReports.length}</Text>
                </BlockStack>
                <BlockStack gap="100">
                  <Text variant="bodyMd" as="p" fontWeight="bold">Errors:</Text>
                  <Text variant="bodyMd" as="p">{/* TODO: Fetch total errors */ allReports.filter(report => report.status === 'ERROR').length}</Text>
                </BlockStack>
                {/* Add more summary items/shortcuts here */}
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* Search Bar */}
        <Layout.Section>
          <TextField
            label="Search reports"
            labelHidden
            value={searchQuery}
            placeholder="Search reports by name, keyword, or tag."
            prefix={<Icon source={SearchIcon} accessibilityLabel="Search" />}
            onChange={handleSearchChange}
            autoComplete="off"
            // The red outline is likely a styling concern, not a prop. We'll address styling later if needed.
            // error="Hint text: \"Search reports by name, keyword, or tag.\""
          />
        </Layout.Section>

        {/* Report Filters */}
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text variant="headingMd" as="h2">Filters</Text>
              <InlineStack gap="400">
                {/* Date Filter */}
                <BlockStack gap="100">
                  <Text variant="bodyMd" as="p" fontWeight="bold">Date Range</Text>
                  <div style={{ position: 'relative' }}>
                    <Button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      fullWidth
                    >
                      {filterDates.start.toLocaleDateString()} – {filterDates.end.toLocaleDateString()}
                    </Button>
                    {showDatePicker && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 10,
                        backgroundColor: 'white',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        borderRadius: '4px',
                        marginTop: '8px'
                      }}>
                        <DatePicker
                          month={filterDates.start.getMonth()}
                          year={filterDates.start.getFullYear()}
                          selected={{ start: filterDates.start, end: filterDates.end }}
                          onMonthChange={handleMonthChange}
                          onChange={handleDateSelection}
                          allowRange
                          multiMonth={false}
                        />
                      </div>
                    )}
                  </div>
                </BlockStack>

                {/* Customer Filter - Note: Filtering by customer/product requires adding these fields to the Report model */}
                <BlockStack gap="100">
                  <Text variant="bodyMd" as="p" fontWeight="bold">Customer</Text>
                  <Select
                    label="Customer filter"
                    labelHidden
                    options={customerOptions}
                    onChange={handleCustomerFilterChange}
                    value={customerFilter}
                    disabled // Disabled as filtering by customer is not implemented on Report model
                  />
                </BlockStack>

                {/* Product Filter - Note: Filtering by customer/product requires adding these fields to the Report model */}
                <BlockStack gap="100">
                  <Text variant="bodyMd" as="p" fontWeight="bold">Product</Text>
                  <Select
                    label="Product filter"
                    labelHidden
                    options={productOptions}
                    onChange={handleProductFilterChange}
                    value={productFilter}
                    disabled // Disabled as filtering by product is not implemented on Report model
                  />
                </BlockStack>

                {/* Status Filter */}
                <BlockStack gap="100">
                  <Text variant="bodyMd" as="p" fontWeight="bold">Status</Text>
                  <Select
                    label="Status filter"
                    labelHidden
                    options={statusOptions}
                    onChange={handleStatusFilterChange}
                    value={statusFilter}
                  />
                </BlockStack>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* MY REPORTS section header and Custom Report button */}
        <Layout.Section>
          <InlineStack>
            <InlineStack gap="200">
              <Icon source={FolderIcon} accessibilityLabel="My Reports" />
              <Text variant="headingMd" as="h2">
                MY REPORTS
              </Text>
            </InlineStack>
            <Button variant="primary" url="/app/reports/manual-export">
              Custom Report
            </Button>
          </InlineStack>
        </Layout.Section>

        {/* Report Table */}
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
              headings={headings}
              rows={rows}
              // TODO: Implement sorting and pagination
              // sortable={[false, false, true, true, false, false]}
              // defaultSortDirection="descending"
              // initialSortColumnIndex={2}
            />
          </Card>
        </Layout.Section>

      </Layout>
    </Page>
  );
} 