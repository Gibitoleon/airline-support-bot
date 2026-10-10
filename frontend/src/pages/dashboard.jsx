import {
  MessageSquare,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
} from "chart.js";

import StatCard from "../components/dashboard/statcard.jsx";
import QueryVolumeChart from "../components/charts/QueryVolumeChart.jsx";
import DoughnutChart from "../components/charts/DoughnutChart.jsx";
import DocumentDomainChart from "../components/charts/DocumentDomainChart.jsx";
import { chartThemes as CHART } from "../themes/chart.themes.js";
import useDashboard from "../customhooks/useDashboard.js";

/* ---------- Chart.js registration ---------- */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip
);

const STATUS_COLORS = {
  answered: CHART.primary,
  pending: CHART.accent,
};

const ACCESS_COLORS = {
  PUBLIC: CHART.primary,
  INTERNAL: CHART.accent,
};

/* ---------- Loading skeleton ---------- */
const DashboardSkeleton = () => (
  <div className="space-y-10 animate-pulse">
    <div>
      <div className="h-8 w-48 rounded bg-surface-light" />
      <div className="mt-2 h-4 w-72 rounded bg-surface-light" />
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 rounded-xl border border-border bg-surface"
        />
      ))}
    </div>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="h-80 rounded-xl border border-border bg-surface lg:col-span-2" />
      <div className="h-80 rounded-xl border border-border bg-surface" />
    </div>
  </div>
);

/* ---------- Error state ---------- */
const DashboardError = ({ message, onRetry }) => (
  <div className="rounded-xl border border-primary/30 bg-surface p-10 text-center shadow-card">
    <AlertCircle className="mx-auto h-8 w-8 text-primary" />
    <p className="mt-3 text-sm font-medium text-text">
      Failed to load dashboard
    </p>
    <p className="mt-1 text-sm text-muted">
      {message || "Something went wrong. Please try again."}
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover"
    >
      Retry
    </button>
  </div>
);

/* ---------- Dashboard ---------- */
const Dashboard = () => {
  const { data, isLoading, isError, error, refetch } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <DashboardError
        message={error?.response?.data?.message}
        onRetry={refetch}
      />
    );
  }

  // API shape: { status, analytics: { queries, documents } }
  const { queries, documents } = data?.analytics ?? {};

  if (!queries || !documents) {
    return (
      <DashboardError
        message="Unexpected response from the server."
        onRetry={refetch}
      />
    );
  }

  const overviewCards = [
    {
      label: "Total Queries",
      value: queries.overview.totalQueries,
      icon: MessageSquare,
      accent: true,
    },
    {
      label: "Answered Queries",
      value: queries.overview.answeredQueries,
      icon: CheckCircle2,
    },
    {
      label: "Pending Queries",
      value: queries.overview.pendingQueries,
      icon: Clock,
    },
    {
      label: "Total Documents",
      value: documents.overview.totalDocuments,
      icon: FileText,
    },
  ];

  const documentCards = [
    {
      label: "Total Documents",
      value: documents.overview.totalDocuments,
      icon: FileText,
      accent: true,
    },
    {
      label: "Active Documents",
      value: documents.overview.activeDocuments,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-text lg:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Overview of the Kenya Airways support system
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Query Activity
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="min-w-0 rounded-xl border border-border bg-surface p-6 shadow-card lg:col-span-2">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-text">
                Daily Query Volume
              </h3>
              <span className="text-xs text-muted">
                {queries.dailyQueryVolume.length} entries
              </span>
            </div>
            <QueryVolumeChart data={queries.dailyQueryVolume} />
          </div>

          <div className="min-w-0 rounded-xl border border-border bg-surface p-6 shadow-card">
            <h3 className="mb-6 text-base font-semibold text-text">
              Queries by Status
            </h3>
            <DoughnutChart
              data={queries.queriesByStatus}
              colorMap={STATUS_COLORS}
              labelKey="status"
              centerLabel="Total"
            />
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Documents
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {documentCards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="min-w-0 rounded-xl border border-border bg-surface p-6 shadow-card lg:col-span-2">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-text">
                Documents by Domain
              </h3>
              <span className="text-xs text-muted">
                {documents.documentsByDomain.length} domains
              </span>
            </div>
            <DocumentDomainChart data={documents.documentsByDomain} />
          </div>

          <div className="min-w-0 rounded-xl border border-border bg-surface p-6 shadow-card">
            <h3 className="mb-6 text-base font-semibold text-text">
              Documents by Access
            </h3>
            <DoughnutChart
              data={documents.documentsByAccess}
              colorMap={ACCESS_COLORS}
              labelKey="access"
              centerLabel="Documents"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;