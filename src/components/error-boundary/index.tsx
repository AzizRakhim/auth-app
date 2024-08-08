import { Component } from "react";
import { Button, Result } from "antd";
import appConfig from "@configs";

export class ErrorBoundary extends Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.log(
      "%c Caught an error!",
      "padding: 5px; background: #e5e0d4; color: #ff1f1f;"
    );
    console.log(error);
  }

  render() {
    const { children, ...rest } = this.props;
    return this.state.hasError ? (
      <Result
        {...rest}
        status="warning"
        title="Oops! Something went wrong!"
        extra={
          <Button
            type="primary"
            onClick={() =>
              window.location.replace(appConfig.authenticatedEntryPath)
            }
          >
            Go Home
          </Button>
        }
      />
    ) : (
      children
    );
  }
}
