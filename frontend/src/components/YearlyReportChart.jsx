const YearlyReportChart = () => {
  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="card-widgets">
            <a href="javascript:;" data-bs-toggle="reload">
              <i className="ri-refresh-line" />
            </a>
            <a
              data-bs-toggle="collapse"
              href="#yearly-sales-collapse"
              role="button"
              aria-expanded="false"
              aria-controls="yearly-sales-collapse"
            >
              <i className="ri-subtract-line" />
            </a>
            <a href="#" data-bs-toggle="remove">
              <i className="ri-close-line" />
            </a>
          </div>
          <h5 className="header-title mb-0">Yearly Sales Report</h5>

          <div
            id="yearly-sales-collapse"
            className="collapse pt-3 show"
          >
            <div dir="ltr">
              <div
                id="yearly-sales-chart"
                className="apex-charts"
                data-colors="#3bc0c3,#1a2942,#d1d7d973"
              />
            </div>
            <div className="row text-center">
              <div className="col">
                <p className="text-muted mt-3 mb-2">Quarter 1</p>
                <h4 className="mb-0">$56.2k</h4>
              </div>
              <div className="col">
                <p className="text-muted mt-3 mb-2">Quarter 2</p>
                <h4 className="mb-0">$42.5k</h4>
              </div>
              <div className="col">
                <p className="text-muted mt-3 mb-2">All Time</p>
                <h4 className="mb-0">$102.03k</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyReportChart;