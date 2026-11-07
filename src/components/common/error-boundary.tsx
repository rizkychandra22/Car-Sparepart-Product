import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error:", error, errorInfo)
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 border border-border text-center space-y-5">
            <div className="size-14 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
              <AlertTriangle className="size-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">Terjadi Kesalahan Sistem</h2>
              <p className="text-sm text-muted-foreground">
                {this.state.error?.message || "Aplikasi mengalami kendala tak terduga."}
              </p>
            </div>
            <Button onClick={this.handleReset} className="w-full gap-2 cursor-pointer">
              <RefreshCw className="size-4" />
              Muat Ulang Halaman
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
