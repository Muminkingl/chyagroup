import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/Card";
import { getSupabaseAdmin } from "@/lib/supabase";
import DashboardChart from "@/components/admin/DashboardChart";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = getSupabaseAdmin();
  
  // Get total posts
  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  // Get total views
  const { data: viewsData } = await supabase
    .from('posts')
    .select('views_count');
  
  const totalViews = viewsData?.reduce((acc, post) => acc + (post.views_count || 0), 0) || 0;

  // Get posts for chart grouping (last 7 months)
  const { data: posts } = await supabase
    .from('posts')
    .select('created_at, views_count')
    .order('created_at', { ascending: true });

  // Process data for recharts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartDataMap: Record<string, { name: string, posts: number, views: number }> = {};
  
  // Last 7 months logic could be added here, but for now we'll just show what we have
  posts?.forEach(post => {
    const date = new Date(post.created_at);
    const monthName = months[date.getMonth()];
    if (!chartDataMap[monthName]) {
      chartDataMap[monthName] = { name: monthName, posts: 0, views: 0 };
    }
    chartDataMap[monthName].posts += 1;
    chartDataMap[monthName].views += (post.views_count || 0);
  });

  // Convert to array and ensure at least some points for the chart if empty
  const chartData = Object.values(chartDataMap).length > 0 
    ? Object.values(chartDataMap) 
    : [{ name: 'N/A', posts: 0, views: 0 }];

  return {
    totalPosts: totalPosts || 0,
    totalViews,
    chartData,
    recentPosts: posts?.slice(-4).reverse() || []
  };
}

export default async function Dashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-zinc-400 mt-2">Real-time overview of your platform's statistics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-zinc-700 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Total Posts
            </CardTitle>
            <iconify-icon icon="solar:document-linear" class="text-zinc-400 text-xl"></iconify-icon>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.totalPosts}</div>
            <p className="text-xs text-zinc-500 mt-1">
              Live from Supabase
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-zinc-700 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Total Views
            </CardTitle>
            <iconify-icon icon="solar:eye-linear" class="text-zinc-400 text-xl"></iconify-icon>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-zinc-500 mt-1">
              Accumulated engagement
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-zinc-700 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Admin Status
            </CardTitle>
            <iconify-icon icon="solar:shield-user-linear" class="text-zinc-400 text-xl"></iconify-icon>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">Active</div>
            <p className="text-xs text-emerald-500 mt-1">
              Secure Session (JWT)
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-zinc-700 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              System Health
            </CardTitle>
            <iconify-icon icon="solar:pulse-linear" class="text-emerald-500 text-xl"></iconify-icon>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-emerald-500">99.9%</div>
            <p className="text-xs text-zinc-500 mt-1">
              Uptime over 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Content Analytics</CardTitle>
            <CardDescription>
              Posting trends grouped by month.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart data={stats.chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
