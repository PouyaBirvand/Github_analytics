import {
  BarChart3,
  Github,
  Users,
  Code,
  TrendingUp,
  GitBranch,
  Star,
  Activity,
} from "lucide-react";

export const featuresData = [
  {
    id: "language-analytics",
    icon: BarChart3,
    title: "Language Analytics",
    description:
      "Comprehensive breakdown of programming languages with usage statistics and trends over time",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "commit-patterns",
    icon: Activity,
    title: "Commit Patterns",
    description:
      "Visualize commit activity, contribution patterns, and coding habits with interactive charts",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "profile-insights",
    icon: Users,
    title: "Profile Insights",
    description:
      "Deep dive into GitHub profile statistics, follower growth, and community engagement metrics",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "repository-analysis",
    icon: Code,
    title: "Repository Analysis",
    description:
      "Detailed repository statistics including stars, forks, issues, and technology stack analysis",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "contribution-trends",
    icon: TrendingUp,
    title: "Contribution Trends",
    description:
      "Track contribution streaks, activity heatmaps, and productivity patterns across time",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: "collaboration-network",
    icon: GitBranch,
    title: "Collaboration Network",
    description:
      "Explore collaboration patterns, pull request statistics, and open source contributions",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    gradient: "from-teal-500 to-green-500",
  },
  {
    id: "popularity-metrics",
    icon: Star,
    title: "Popularity Metrics",
    description:
      "Analyze repository popularity, star growth rates, and community engagement levels",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "code-quality",
    icon: Github,
    title: "Code Quality Insights",
    description:
      "Assess code quality through commit frequency, issue resolution, and project maintenance",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    gradient: "from-gray-500 to-slate-500",
  },
];
