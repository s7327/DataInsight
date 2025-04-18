import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart2, TrendingUp, Users, DollarSign,
  ShoppingCart, Calendar, ArrowRight, ArrowUp, ArrowDown,
  Clock, BarChart, PieChart, LineChart
} from "lucide-react";

// Component to show a simple stat card
const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        <span>{change}</span>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  useEffect(() => {
    // In a real application, you would fetch dashboard data here
    console.log("Dashboard mounted - would fetch data here in a real app");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back!</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <span className="text-sm text-gray-500 mr-2">Last updated:</span>
          <div className="flex items-center text-sm text-primary">
            <Clock className="h-4 w-4 mr-1" />
            <span>Just now</span>
          </div>
        </div>
      </div>


      {/* Embed Power BI report */}
      <div className="bg-white rounded-md shadow-md mb-8 p-4">
        <CardHeader>
          <CardTitle>Power BI Report</CardTitle>
          <CardDescription>Sales and revenue analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <iframe
            width="100%"
            height="500"
            src="https://app.powerbi.com/reportEmbed?reportId=5c49f645-d277-42b0-8c12-865b786d4e82&autoAuth=true&ctid=23035d1f-133c-44b5-b2ad-b3aef17baaa1"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </CardContent>
      </div>

      {/* Other Content */}
      {/* You can keep the rest of the dashboard content below */}
    </div>
  );
};

export default Dashboard;
