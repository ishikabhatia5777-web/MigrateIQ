import { ProjectData } from '../types/migration';

export const sampleProjects: Record<string, ProjectData> = {
  tableau_sales: {
    id: 'tableau_sales',
    name: 'Global Sales & Profitability Enterprise',
    platform: 'tableau',
    sourceFile: 'Global_Sales_Analytics_2026.twbx',
    sourceSize: '48.2 MB',
    diagnostic: {
      appName: 'Global Sales & Profitability Enterprise',
      sourceFormat: 'Tableau 2024.1 (.twbx packaged workbook)',
      readinessScore: 96,
      complexityScore: 78,
      complexityBand: 'Moderate',
      stats: {
        totalSheets: 14,
        dashboards: 4,
        calculatedFields: 42,
        parameters: 6,
        lodOrSetExpressions: 9,
        dataSourcesCount: 2,
        customSqlCount: 1,
      },
      blockers: [
        {
          id: 'BLK-01',
          severity: 'HIGH',
          component: 'LOD Fixed Expression: Regional Benchmark',
          description: 'Nested {FIXED [Region], [Segment] : SUM([Sales])} with dimension filters',
          recommendedResolution: 'Automatically synthesized to DAX CALCULATE with ALLEXCEPT/ALLSELECTED context modifier by Convergence Kernel.',
        },
        {
          id: 'BLK-02',
          severity: 'MEDIUM',
          component: 'Custom SQL Extraction: Legacy Oracle Join',
          description: 'Custom SQL with dialect-specific TO_DATE and Oracle hints',
          recommendedResolution: 'Parsed into Fabric Lakehouse Bronze Delta table with Direct Lake silver view.',
        },
        {
          id: 'BLK-03',
          severity: 'LOW',
          component: 'Tableau Dual-Axis Chart',
          description: 'Synchronized dual-axis with bar & line overlay',
          recommendedResolution: 'Directly mapped to native Power BI Line & Clustered Column Visual.',
        },
      ],
      effort: {
        manualDays: 24,
        agenticMinutes: 4.8,
        hoursSaved: 192,
        estimatedCostSavingsUsd: 28800,
      },
    },
    metadata: {
      appName: 'Global Sales & Profitability Enterprise',
      astTree: [
        {
          id: 'ast_ds',
          name: 'Data Connections (2)',
          type: 'datasource',
          children: [
            { id: 'ds_hyper', name: 'Orders_Warehouse.hyper (Direct Lake Candidate)', type: 'datasource' },
            { id: 'ds_oracle', name: 'Oracle_Finance_Replica (Custom SQL)', type: 'datasource' },
          ],
        },
        {
          id: 'ast_dash',
          name: 'Dashboards (4)',
          type: 'dashboard',
          children: [
            { id: 'd1', name: 'Executive Revenue Overview', type: 'dashboard' },
            { id: 'd2', name: 'Regional Performance & Margins', type: 'dashboard' },
            { id: 'd3', name: 'Customer Lifetime Value Cohorts', type: 'dashboard' },
            { id: 'd4', name: 'Product Category Profitability Matrix', type: 'dashboard' },
          ],
        },
        {
          id: 'ast_calc',
          name: 'Calculated Fields (42)',
          type: 'calculated_field',
          children: [
            { id: 'cf1', name: 'LOD Regional Sales Benchmark', type: 'calculated_field' },
            { id: 'cf2', name: 'Gross Margin %', type: 'calculated_field' },
            { id: 'cf3', name: 'YoY Growth Adjusted', type: 'calculated_field' },
            { id: 'cf4', name: 'Cohort Retention Bucket', type: 'calculated_field' },
          ],
        },
        {
          id: 'ast_param',
          name: 'Parameters (6)',
          type: 'parameter',
          children: [
            { id: 'p1', name: 'Target Margin Threshold (Default: 0.28)', type: 'parameter' },
            { id: 'p2', name: 'Forecast Months Horizon (Default: 6)', type: 'parameter' },
          ],
        },
      ],
      dataSources: [
        {
          name: 'Orders_Warehouse.hyper',
          type: 'Tableau Hyper Extract',
          targetFabricDirectLake: 'lh_sales_lakehouse.Orders',
          tableCount: 4,
          columnsCount: 38,
          rowCountEstimate: '1,450,000 rows',
        },
        {
          name: 'Oracle_Finance_Replica',
          type: 'Relational Database Extract',
          targetFabricDirectLake: 'lh_sales_lakehouse.DimFinance',
          tableCount: 2,
          columnsCount: 16,
          rowCountEstimate: '320,000 rows',
        },
      ],
      extractedCalculations: [
        {
          name: 'Regional Fixed Benchmark',
          datatype: 'Currency',
          rawExpression: '{FIXED [Region], [Segment] : SUM([Sales])}',
          dependencies: ['Region', 'Segment', 'Sales'],
        },
        {
          name: 'Gross Margin Ratio',
          datatype: 'Percentage',
          rawExpression: 'SUM([Profit]) / SUM([Sales])',
          dependencies: ['Profit', 'Sales'],
        },
        {
          name: 'Discounted Price Actual',
          datatype: 'Currency',
          rawExpression: '[Unit Price] * (1 - [Discount]) * [Quantity]',
          dependencies: ['Unit Price', 'Discount', 'Quantity'],
        },
      ],
      visualContainers: [
        {
          id: 'v1',
          title: 'Monthly Revenue vs Budget YoY',
          type: 'Dual Axis Line/Bar',
          sheet: 'Executive Revenue Overview',
          dimensions: ['Order Date (Month)', 'Region'],
          measures: ['Total Sales', 'Budget Target'],
        },
        {
          id: 'v2',
          title: 'Geographic Profitability Heatmap',
          type: 'Choropleth Filled Map',
          sheet: 'Regional Performance',
          dimensions: ['State / Province', 'Country'],
          measures: ['Gross Margin Ratio'],
        },
        {
          id: 'v3',
          title: 'Category Margin Treemap',
          type: 'Treemap Matrix',
          sheet: 'Product Category Matrix',
          dimensions: ['Category', 'Sub-Category'],
          measures: ['Total Profit', 'Units Sold'],
        },
      ],
    },
    convergence: {
      semanticModelName: 'sm_global_sales_directlake',
      directLakeStrategy: 'Direct Lake (Bronze -> Silver -> Gold)',
      averageConfidence: 98.7,
      relationships: [
        {
          fromTable: 'FactOrders',
          fromColumn: 'CustomerID',
          toTable: 'DimCustomer',
          toColumn: 'CustomerID',
          cardinality: 'manyToOne',
          isActive: true,
        },
        {
          fromTable: 'FactOrders',
          fromColumn: 'OrderDateKey',
          toTable: 'DimDate',
          toColumn: 'DateKey',
          cardinality: 'manyToOne',
          isActive: true,
        },
        {
          fromTable: 'FactOrders',
          fromColumn: 'ProductSKU',
          toTable: 'DimProduct',
          toColumn: 'ProductSKU',
          cardinality: 'manyToOne',
          isActive: true,
        },
      ],
      daxTranslations: [
        {
          id: 'DAX-01',
          sourceField: 'Regional Fixed Benchmark',
          sourceType: 'tableau_lod',
          sourceFormula: '{FIXED [Region], [Segment] : SUM([Sales])}',
          intermediateRepresentation: 'UIR.FIXED_LOD(Dims=[Region, Segment], Agg=SUM(Orders.Sales))',
          targetDax: 'CALCULATE(\n    SUM(FactOrders[Sales]),\n    ALLEXCEPT(FactOrders, FactOrders[Region], FactOrders[Segment])\n)',
          confidence: 99.2,
          daxGuardStatus: 'VERIFIED',
          ruleApplied: 'LOD_FIXED_TO_ALLEXCEPT_V2',
          explanation: 'Tableau FIXED Level of Detail expression translated into DAX CALCULATE with ALLEXCEPT preserving Region and Segment context while clearing visual slicers.',
        },
        {
          id: 'DAX-02',
          sourceField: 'Gross Margin %',
          sourceType: 'calculated_field',
          sourceFormula: 'SUM([Profit]) / SUM([Sales])',
          intermediateRepresentation: 'UIR.SAFE_DIVIDE(SUM(Profit), SUM(Sales))',
          targetDax: 'DIVIDE(\n    SUM(FactOrders[Profit]),\n    SUM(FactOrders[Sales]),\n    0\n)',
          confidence: 100,
          daxGuardStatus: 'PASSED',
          ruleApplied: 'SAFE_DIVIDE_TRANSLATION',
          explanation: 'Standard quotient translated using DIVIDE function with zero-division safeguard for Power BI and Direct Lake efficiency.',
        },
        {
          id: 'DAX-03',
          sourceField: 'YoY Growth Rate',
          sourceType: 'window_function',
          sourceFormula: '(ZN(SUM([Sales])) - LOOKUP(ZN(SUM([Sales])), -1)) / ABS(LOOKUP(ZN(SUM([Sales])), -1))',
          intermediateRepresentation: 'UIR.PERIOD_GROWTH(Measure=SUM(Sales), Period=YEAR)',
          targetDax: 'VAR CurrentSales = [Total Sales]\nVAR PriorYearSales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[FullDate]))\nRETURN\n    DIVIDE(CurrentSales - PriorYearSales, ABS(PriorYearSales), 0)',
          confidence: 97.4,
          daxGuardStatus: 'VERIFIED',
          ruleApplied: 'TABLEAU_LOOKUP_TO_TIME_INTELLIGENCE',
          explanation: 'Tableau LOOKUP(-1) table calculation converted into idiomatic DAX VAR construct utilizing SAMEPERIODLASTYEAR with Direct Lake partition awareness.',
        },
      ],
      visualMappings: [
        {
          id: 'VM-01',
          sourceVisual: 'Dual-Axis Line / Bar Chart',
          targetFabricVisual: 'lineStackedColumnCombo',
          fieldRolesMapped: {
            category: 'DimDate[MonthYear]',
            values: 'FactOrders[Total Sales]',
            series: 'FactOrders[Budget Target]',
            tooltips: 'FactOrders[Gross Margin %]',
          },
          confidence: 99.1,
        },
        {
          id: 'VM-02',
          sourceVisual: 'Choropleth Filled Map',
          targetFabricVisual: 'filledMap',
          fieldRolesMapped: {
            category: 'DimCustomer[StateProvince]',
            values: 'FactOrders[Gross Margin %]',
          },
          confidence: 98.4,
        },
        {
          id: 'VM-03',
          sourceVisual: 'Treemap Matrix',
          targetFabricVisual: 'treemap',
          fieldRolesMapped: {
            category: 'DimProduct[Category]',
            series: 'DimProduct[SubCategory]',
            values: 'FactOrders[Total Profit]',
          },
          confidence: 99.5,
        },
      ],
    },
    biEngineering: {
      pbirDefinition: {
        version: '1.0',
        datasetReference: {
          byPath: {
            path: '../sm_global_sales_directlake.Dataset',
          },
          byConnection: null,
        },
        visualContainers: [
          {
            id: 'vc_01',
            name: 'visual_container_revenue_yoy',
            visualType: 'lineStackedColumnCombo',
            config: {
              title: 'Revenue Performance vs Budget',
              legend: { show: true, position: 'Top' },
              xAxis: { type: 'categorical' },
            },
          },
          {
            id: 'vc_02',
            name: 'visual_container_geo_heatmap',
            visualType: 'filledMap',
            config: {
              dataLabels: { show: true },
              divergingColorScale: { min: '#EF4444', mid: '#F59E0B', max: '#10B981' },
            },
          },
        ],
      },
      tmdlFiles: {
        'model.tmdl': `model Model
\tcompatibilityLevel: 1600
\tculture: en-US
\tdefaultPowerBIDataSourceVersion: powerBI_V3

annotation __PBI_TimeIntelligenceEnabled = 1
annotation PBIDesktopVersion = 2.138.1452.0 (Direct Lake)
`,
        'tables/FactOrders.tmdl': `table FactOrders
\tlineageTag: 4892c90a-7e12-4d3b-9a1c-30b8e721a911
\tsource = DirectLake(
\t\tLakehouse = "lh_sales_lakehouse",
\t\tSchema = "gold",
\t\tTable = "fact_orders"
\t)

\tmeasure 'Total Sales' = SUM(FactOrders[Sales])
\t\tformatString: "$#,##0.00"

\tmeasure 'Total Profit' = SUM(FactOrders[Profit])
\t\tformatString: "$#,##0.00"

\tmeasure 'Gross Margin %' = DIVIDE([Total Profit], [Total Sales], 0)
\t\tformatString: "0.0%"

\tmeasure 'Regional Fixed Benchmark' = 
\t\tCALCULATE(
\t\t\tSUM(FactOrders[Sales]),
\t\t\tALLEXCEPT(FactOrders, FactOrders[Region], FactOrders[Segment])
\t\t)
\t\tformatString: "$#,##0.00"

\tcolumn OrderID
\t\tdataType: string
\t\tsourceColumn: order_id

\tcolumn Sales
\t\tdataType: double
\t\tsourceColumn: sales

\tcolumn Profit
\t\tdataType: double
\t\tsourceColumn: profit
`,
        'relationships.tmdl': `relationship rel_orders_date
\tfromColumn: FactOrders.OrderDateKey
\ttoColumn: DimDate.DateKey

relationship rel_orders_customer
\tfromColumn: FactOrders.CustomerID
\ttoColumn: DimCustomer.CustomerID
`,
      },
      deltaSchemas: [
        {
          layer: 'Bronze',
          tableName: 'raw_orders_hyper',
          format: 'Delta Parquet v2',
          storageUrl: 'abfss://workspace@onelake.dfs.fabric.microsoft.com/lh_sales/Tables/bronze_orders',
        },
        {
          layer: 'Silver',
          tableName: 'silver_cleaned_orders',
          format: 'Delta Parquet (Direct Lake Optimized)',
          partitionColumn: 'OrderYear',
          storageUrl: 'abfss://workspace@onelake.dfs.fabric.microsoft.com/lh_sales/Tables/silver_orders',
        },
        {
          layer: 'Gold',
          tableName: 'gold_fact_orders',
          format: 'Delta Parquet (V-Order Encoded)',
          partitionColumn: 'Region',
          storageUrl: 'abfss://workspace@onelake.dfs.fabric.microsoft.com/lh_sales/Tables/fact_orders',
        },
      ],
      deploymentTarget: {
        workspace: 'Fabric_Enterprise_Analytics_Prod',
        lakehouse: 'lh_sales_lakehouse',
        sqlEndpoint: 'sqlep-sales-analytics.fabric.microsoft.com',
        directLakeStatus: 'READY_TO_SYNC',
      },
      bundleSizeKb: 1420,
    },
    qualityAssurance: {
      overallFidelityScore: 99.6,
      visualAccuracyScore: 99.2,
      dataReconciliationScore: 99.9,
      status: 'CERTIFIED_READY',
      reconciliations: [
        {
          kpiName: 'Global Net Sales FY2025',
          sourceValue: '$42,845,920.00',
          fabricDirectLakeValue: '$42,845,920.00',
          variancePct: 0.0,
          status: 'EXACT_MATCH',
        },
        {
          kpiName: 'Gross Margin Percentage',
          sourceValue: '31.42%',
          fabricDirectLakeValue: '31.42%',
          variancePct: 0.0,
          status: 'EXACT_MATCH',
        },
        {
          kpiName: 'Operating Net Profit',
          sourceValue: '$13,462,800.00',
          fabricDirectLakeValue: '$13,462,800.00',
          variancePct: 0.0,
          status: 'EXACT_MATCH',
        },
        {
          kpiName: 'Total Order Volume (Distinct)',
          sourceValue: '184,290',
          fabricDirectLakeValue: '184,290',
          variancePct: 0.0,
          status: 'EXACT_MATCH',
        },
        {
          kpiName: 'Customer Lifetime Cohort Retention',
          sourceValue: '76.84%',
          fabricDirectLakeValue: '76.81%',
          variancePct: 0.03,
          status: 'WITHIN_TOLERANCE',
        },
      ],
      testSuite: {
        totalTests: 28,
        passed: 28,
        warned: 0,
        failed: 0,
      },
      regressionChecks: [
        {
          sheet: 'Executive Revenue Overview',
          visual: 'Monthly Revenue vs Budget',
          layoutDriftPx: 0.2,
          colorParityPct: 100,
          interactionParity: '100% Native',
        },
        {
          sheet: 'Regional Performance',
          visual: 'Geographic Profitability Heatmap',
          layoutDriftPx: 0.4,
          colorParityPct: 99.6,
          interactionParity: 'Direct Lake Equivalent',
        },
      ],
      auditCertificateId: 'VL-CERT-FABRIC-2026-90412',
      timestamp: '2026-10-21T14:10:00Z',
    },
  },

  qlik_supply_chain: {
    id: 'qlik_supply_chain',
    name: 'Supply Chain & Direct Lake Inventory Fleet',
    platform: 'qlik',
    sourceFile: 'Fleet_Supply_Chain_Control.qvf',
    sourceSize: '62.4 MB',
    diagnostic: {
      appName: 'Supply Chain & Direct Lake Inventory Fleet',
      sourceFormat: 'Qlik Sense Enterprise (.qvf app + .qvd storage)',
      readinessScore: 92,
      complexityScore: 84,
      complexityBand: 'Complex',
      stats: {
        totalSheets: 11,
        dashboards: 3,
        calculatedFields: 54,
        parameters: 8,
        lodOrSetExpressions: 16,
        dataSourcesCount: 3,
        customSqlCount: 0,
      },
      blockers: [
        {
          id: 'BLK-Q1',
          severity: 'HIGH',
          component: 'Qlik Set Analysis with Dollar-Sign Expansion',
          description: "Sum({<Year={$(=Max(Year))}, Status={'Delivered'}>} FleetCost)",
          recommendedResolution: 'Convergence Kernel mapped with LLM semantic kernel to DAX CALCULATE + MAX context filters.',
        },
        {
          id: 'BLK-Q2',
          severity: 'MEDIUM',
          component: 'Aggr() Virtual Dimension Aggregation',
          description: 'Aggr(Sum(FuelExpense), CarrierName, VehicleType) embedded inside visual sort',
          recommendedResolution: 'Converted to DAX SUMMARIZECOLUMNS with virtual measure evaluation.',
        },
        {
          id: 'BLK-Q3',
          severity: 'LOW',
          component: 'Qlik Alternate States',
          description: 'Side-by-side carrier comparison using Group1 and Group2 states',
          recommendedResolution: 'Synthesized into disconnected parameter tables in Power BI with TREATAS switching.',
        },
      ],
      effort: {
        manualDays: 32,
        agenticMinutes: 5.6,
        hoursSaved: 256,
        estimatedCostSavingsUsd: 38400,
      },
    },
    metadata: {
      appName: 'Supply Chain & Direct Lake Inventory Fleet',
      astTree: [
        {
          id: 'q_ds',
          name: 'QVD Sources & Data Model (3)',
          type: 'datasource',
          children: [
            { id: 'qvd_fleet', name: 'FleetTransactions.qvd (4.8M rows)', type: 'datasource' },
            { id: 'qvd_carriers', name: 'CarriersMaster.qvd (240 rows)', type: 'datasource' },
            { id: 'qvd_routes', name: 'RoutesGeo.qvd (1,200 rows)', type: 'datasource' },
          ],
        },
        {
          id: 'q_sheets',
          name: 'Qlik Sheets (11)',
          type: 'worksheet',
          children: [
            { id: 'qs1', name: 'Fleet Performance & On-Time Rate', type: 'worksheet' },
            { id: 'qs2', name: 'Fuel & Maintenance Discrepancy', type: 'worksheet' },
            { id: 'qs3', name: 'Route Optimization & Bottlenecks', type: 'worksheet' },
            { id: 'qs4', name: 'Warehouse Dock Turnaround', type: 'worksheet' },
          ],
        },
        {
          id: 'q_master',
          name: 'Master Items & Set Analysis (54)',
          type: 'calculated_field',
          children: [
            { id: 'qm1', name: 'Current Year Delivered Cost', type: 'calculated_field' },
            { id: 'qm2', name: 'Late Delivery Discrepancy Rate', type: 'calculated_field' },
            { id: 'qm3', name: 'Fuel Burn Rate per Ton-Mile', type: 'calculated_field' },
          ],
        },
      ],
      dataSources: [
        {
          name: 'FleetTransactions.qvd',
          type: 'Qlik QVD High-Volume Extract',
          targetFabricDirectLake: 'lh_supplychain.FleetTransactions',
          tableCount: 1,
          columnsCount: 44,
          rowCountEstimate: '4,821,900 rows',
        },
        {
          name: 'CarriersMaster.qvd',
          type: 'Qlik Dimension Table',
          targetFabricDirectLake: 'lh_supplychain.DimCarrier',
          tableCount: 1,
          columnsCount: 18,
          rowCountEstimate: '240 rows',
        },
      ],
      extractedCalculations: [
        {
          name: 'Delivered Cost Current Year',
          datatype: 'Currency',
          rawExpression: "Sum({<Year={$(=Max(Year))}, Status={'Delivered'}>} FleetCost)",
          dependencies: ['Year', 'Status', 'FleetCost'],
        },
        {
          name: 'Delayed Shipments Count',
          datatype: 'Integer',
          rawExpression: 'Count({<DelayHours={">24"}>} DISTINCT ShipmentID)',
          dependencies: ['DelayHours', 'ShipmentID'],
        },
      ],
      visualContainers: [
        {
          id: 'qv1',
          title: 'Fleet On-Time Delivery Gauge',
          type: 'KPI Gauge Visual',
          sheet: 'Fleet Performance',
          dimensions: [],
          measures: ['On-Time %', 'Target SLA'],
        },
        {
          id: 'qv2',
          title: 'Carrier Route Cost Comparison',
          type: 'Scatter Plot with Trendline',
          sheet: 'Route Optimization',
          dimensions: ['CarrierName'],
          measures: ['Cost per Ton-Mile', 'Average Delay Minutes'],
        },
      ],
    },
    convergence: {
      semanticModelName: 'sm_supply_chain_directlake',
      directLakeStrategy: 'Direct Lake (Bronze -> Silver -> Gold)',
      averageConfidence: 98.1,
      relationships: [
        {
          fromTable: 'FactFleet',
          fromColumn: 'CarrierID',
          toTable: 'DimCarrier',
          toColumn: 'CarrierID',
          cardinality: 'manyToOne',
          isActive: true,
        },
        {
          fromTable: 'FactFleet',
          fromColumn: 'RouteID',
          toTable: 'DimRoute',
          toColumn: 'RouteID',
          cardinality: 'manyToOne',
          isActive: true,
        },
      ],
      daxTranslations: [
        {
          id: 'QDAX-01',
          sourceField: 'Delivered Cost Current Year',
          sourceType: 'qlik_set_analysis',
          sourceFormula: "Sum({<Year={$(=Max(Year))}, Status={'Delivered'}>} FleetCost)",
          intermediateRepresentation: 'UIR.SET_ANALYSIS(Filter=[Year==MAX(Year), Status=="Delivered"], Measure=SUM(FleetCost))',
          targetDax: 'CALCULATE(\n    SUM(FactFleet[FleetCost]),\n    FactFleet[Year] = MAX(FactFleet[Year]),\n    FactFleet[Status] = "Delivered"\n)',
          confidence: 98.9,
          daxGuardStatus: 'VERIFIED',
          ruleApplied: 'QLIK_SET_ANALYSIS_PBI_CALCULATE',
          explanation: 'Qlik dollar-sign expansion evaluated at compile time and transformed into dynamic DAX filter predicate evaluated within Direct Lake semantic model.',
        },
        {
          id: 'QDAX-02',
          sourceField: 'Delayed Shipments Count',
          sourceType: 'qlik_set_analysis',
          sourceFormula: 'Count({<DelayHours={">24"}>} DISTINCT ShipmentID)',
          intermediateRepresentation: 'UIR.SET_ANALYSIS(Filter=[DelayHours > 24], Measure=DISTINCTCOUNT(ShipmentID))',
          targetDax: 'CALCULATE(\n    DISTINCTCOUNT(FactFleet[ShipmentID]),\n    FactFleet[DelayHours] > 24\n)',
          confidence: 99.4,
          daxGuardStatus: 'PASSED',
          ruleApplied: 'QLIK_DISTINCTCOUNT_SET',
          explanation: 'Converted Qlik set modifier on numeric threshold into native DAX boolean filter expression.',
        },
        {
          id: 'QDAX-03',
          sourceField: 'Aggr Fuel by Carrier',
          sourceType: 'calculated_field',
          sourceFormula: 'Aggr(Sum(FuelExpense), CarrierName, VehicleType)',
          intermediateRepresentation: 'UIR.GROUP_BY_AGGR(Dims=[CarrierName, VehicleType], Agg=SUM(FuelExpense))',
          targetDax: 'SUMMARIZECOLUMNS(\n    DimCarrier[CarrierName],\n    FactFleet[VehicleType],\n    "TotalFuel", SUM(FactFleet[FuelExpense])\n)',
          confidence: 96.8,
          daxGuardStatus: 'VERIFIED',
          ruleApplied: 'QLIK_AGGR_TO_SUMMARIZECOLUMNS',
          explanation: 'Qlik nested Aggr virtual table logic converted to Power BI high-performance SUMMARIZECOLUMNS expression.',
        },
      ],
      visualMappings: [
        {
          id: 'QVM-01',
          sourceVisual: 'Qlik Sense KPI Gauge',
          targetFabricVisual: 'gauge',
          fieldRolesMapped: {
            values: 'FactFleet[On-Time %]',
            series: 'FactFleet[Target SLA]',
          },
          confidence: 99.0,
        },
        {
          id: 'QVM-02',
          sourceVisual: 'Qlik Scatter Plot',
          targetFabricVisual: 'scatterChart',
          fieldRolesMapped: {
            category: 'DimCarrier[CarrierName]',
            values: 'FactFleet[Cost per Ton-Mile]',
            series: 'FactFleet[Average Delay Minutes]',
          },
          confidence: 98.2,
        },
      ],
    },
    biEngineering: {
      pbirDefinition: {
        version: '1.0',
        datasetReference: {
          byPath: {
            path: '../sm_supply_chain_directlake.Dataset',
          },
          byConnection: null,
        },
        visualContainers: [
          {
            id: 'vc_q01',
            name: 'visual_container_gauge_ontime',
            visualType: 'gauge',
            config: {
              title: 'On-Time Fleet Dispatch Ratio',
              gaugeTarget: 0.95,
            },
          },
        ],
      },
      tmdlFiles: {
        'model.tmdl': `model Model
\tcompatibilityLevel: 1600
\tculture: en-US
\tdefaultPowerBIDataSourceVersion: powerBI_V3

annotation DirectLakeMode = Enabled
annotation QlikSourceMigration = Fleet_Supply_Chain_Control
`,
        'tables/FactFleet.tmdl': `table FactFleet
\tlineageTag: b921e42a-194d-482a-bc90-880fa1934271
\tsource = DirectLake(
\t\tLakehouse = "lh_supplychain",
\t\tSchema = "gold",
\t\tTable = "fact_fleet_transactions"
\t)

\tmeasure 'Total Fleet Cost' = SUM(FactFleet[FleetCost])
\t\tformatString: "$#,##0.00"

\tmeasure 'Delivered Cost Current Year' = 
\t\tCALCULATE(
\t\t\tSUM(FactFleet[FleetCost]),
\t\t\tFactFleet[Year] = MAX(FactFleet[Year]),
\t\t\tFactFleet[Status] = "Delivered"
\t\t)
\t\tformatString: "$#,##0.00"

\tmeasure 'Delayed Shipments Count' = 
\t\tCALCULATE(
\t\t\tDISTINCTCOUNT(FactFleet[ShipmentID]),
\t\t\tFactFleet[DelayHours] > 24
\t\t)
\t\tformatString: "#,##0"

\tcolumn ShipmentID
\t\tdataType: string
\t\tsourceColumn: shipment_id

\tcolumn FleetCost
\t\tdataType: double
\t\tsourceColumn: fleet_cost
`,
        'relationships.tmdl': `relationship rel_fleet_carrier
\tfromColumn: FactFleet.CarrierID
\ttoColumn: DimCarrier.CarrierID
`,
      },
      deltaSchemas: [
        {
          layer: 'Bronze',
          tableName: 'bronze_qvd_raw_fleet',
          format: 'Delta Parquet',
          storageUrl: 'abfss://workspace@onelake.dfs.fabric.microsoft.com/lh_supplychain/Tables/bronze_fleet',
        },
        {
          layer: 'Silver',
          tableName: 'silver_fleet_transactions',
          format: 'Delta Parquet (Direct Lake Partitioned)',
          partitionColumn: 'CarrierID',
          storageUrl: 'abfss://workspace@onelake.dfs.fabric.microsoft.com/lh_supplychain/Tables/silver_fleet',
        },
        {
          layer: 'Gold',
          tableName: 'gold_fact_fleet',
          format: 'Delta Parquet (Direct Lake V-Order)',
          partitionColumn: 'DispatchYearMonth',
          storageUrl: 'abfss://workspace@onelake.dfs.fabric.microsoft.com/lh_supplychain/Tables/fact_fleet_transactions',
        },
      ],
      deploymentTarget: {
        workspace: 'Supply_Chain_Operations_Fabric',
        lakehouse: 'lh_supplychain',
        sqlEndpoint: 'sqlep-supplychain.fabric.microsoft.com',
        directLakeStatus: 'READY_TO_SYNC',
      },
      bundleSizeKb: 1840,
    },
    qualityAssurance: {
      overallFidelityScore: 99.4,
      visualAccuracyScore: 98.9,
      dataReconciliationScore: 99.8,
      status: 'CERTIFIED_READY',
      reconciliations: [
        {
          kpiName: 'Total Fleet Operating Cost',
          sourceValue: '$118,492,300.00',
          fabricDirectLakeValue: '$118,492,300.00',
          variancePct: 0.0,
          status: 'EXACT_MATCH',
        },
        {
          kpiName: 'Total Dispatched Shipments',
          sourceValue: '4,821,900',
          fabricDirectLakeValue: '4,821,900',
          variancePct: 0.0,
          status: 'EXACT_MATCH',
        },
        {
          kpiName: 'Overall On-Time Delivery Rate',
          sourceValue: '94.28%',
          fabricDirectLakeValue: '94.28%',
          variancePct: 0.0,
          status: 'EXACT_MATCH',
        },
        {
          kpiName: 'Fuel Burn Rate (Gallons/Mile)',
          sourceValue: '0.1428',
          fabricDirectLakeValue: '0.1427',
          variancePct: 0.07,
          status: 'WITHIN_TOLERANCE',
        },
      ],
      testSuite: {
        totalTests: 32,
        passed: 32,
        warned: 0,
        failed: 0,
      },
      regressionChecks: [
        {
          sheet: 'Fleet Performance & On-Time Rate',
          visual: 'Fleet On-Time Delivery Gauge',
          layoutDriftPx: 0.1,
          colorParityPct: 100,
          interactionParity: '100% Native',
        },
      ],
      auditCertificateId: 'VL-CERT-QLIK-2026-88194',
      timestamp: '2026-10-21T14:10:00Z',
    },
  },
};
