
const WeeklySalesReportCard = () => {
  return (
    <div className="col-lg-8">
      <div className="card">
        <div className="card-body">
          <div className="card-widgets">
            <a href="javascript:;" data-bs-toggle="reload">
              <i className="ri-refresh-line" />
            </a>
            <a
              data-bs-toggle="collapse"
              href="#weeklysales-collapse"
              role="button"
              aria-expanded="false"
              aria-controls="weeklysales-collapse"
            >
              <i className="ri-subtract-line" />
            </a>
            <a href="#" data-bs-toggle="remove">
              <i className="ri-close-line" />
            </a>
          </div>
          <h5 className="header-title mb-0">Weekly Sales Report</h5>

          <div id="weeklysales-collapse" className="collapse pt-3 show">
            <div dir="ltr">
              <div id="revenue-chart" className="apex-charts" data-colors="#3bc0c3,#1a2942,#d1d7d973" />
            </div>

            <div className="row text-center">
              <div className="col">
                <p className="text-muted mt-3">Current Week</p>
                <h3 className="mb-0">
                  <span>$506.54</span>
                </h3>
              </div>
              <div className="col">
                <p className="text-muted mt-3">Previous Week</p>
                <h3 className="mb-0">
                  <span>$305.25 </span>
                </h3>
              </div>
              <div className="col">
                <p className="text-muted mt-3">Conversation</p>
                <h3 className="mb-0">
                  <span>3.27%</span>
                </h3>
              </div>
              <div className="col">
                <p className="text-muted mt-3">Customers</p>
                <h3 className="mb-0">
                  <span>3k</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySalesReportCard;