import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error) {
    // Cập nhật state khi có lỗi
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Lưu thông tin lỗi chi tiết
    this.setState({ errorInfo });
    // Log lỗi ra console hoặc gửi đến dịch vụ logging
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    // Reset state để thử render lại
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Oops, có lỗi xảy ra!
            </h2>
            <p className="text-gray-300 mb-6">
              {this.state.error?.message ||
                "Đã có lỗi không mong muốn. Vui lòng thử lại."}
            </p>
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Thử lại
            </button>
            {process.env.NODE_ENV === "development" && (
              <div className="mt-6 text-left text-gray-400">
                <details>
                  <summary className="cursor-pointer text-blue-400">
                    Chi tiết lỗi
                  </summary>
                  <pre className="mt-2 text-sm overflow-auto">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
