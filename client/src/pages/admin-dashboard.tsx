import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Shield, LogOut, Package, ShoppingCart, Users, TrendingUp, Settings, FileText, RotateCcw } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [dailyLimit, setDailyLimit] = useState(10);
  const [autoGeneration, setAutoGeneration] = useState(true);

  // Check if admin is authenticated
  const { data: admin, isLoading, error } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  // Get products for dashboard stats
  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  // Get SEO keywords
  const { data: keywords = [] } = useQuery({
    queryKey: ["/api/admin/seo/keywords"],
  });

  // Get SEO pages
  const { data: pages = [] } = useQuery({
    queryKey: ["/api/admin/seo/pages"],
  });

  // Get SEO settings
  const { data: seoSettings } = useQuery({
    queryKey: ["/api/admin/seo/settings"],
  });

  const typedProducts = products as any[];
  const typedKeywords = keywords as any[];
  const typedPages = pages as any[];

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && (error || !admin)) {
      toast({
        title: "Access Denied",
        description: "Please login to access the admin dashboard",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/admin");
      }, 1000);
    }
  }, [admin, isLoading, error, setLocation, toast]);

  // Update SEO settings
  const updateSettingsMutation = useMutation({
    mutationFn: async (updates: any) => {
      return await apiRequest("/api/admin/seo/settings", {
        method: "PATCH",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo/settings"] });
      toast({
        title: "Settings Updated",
        description: "SEO settings have been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  // Reset daily count
  const resetDailyMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/admin/seo/reset-daily", {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo/settings"] });
      toast({
        title: "Daily Count Reset",
        description: "Daily page creation count has been reset to 0",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reset daily count",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Logout failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      setLocation("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Logout Error",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect to login
  }

  const stats = [
    {
      title: "Total Products",
      value: typedProducts.length,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Product Types",
      value: new Set(typedProducts.map((p: any) => p.type)).size,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "In Stock Items",
      value: typedProducts.filter((p: any) => p.inStock).length,
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
    {
      title: "Active Admin",
      value: "1",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome back, {(admin as any)?.username || 'Admin'}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
              disabled={logoutMutation.isPending}
            >
              <LogOut className="w-4 h-4" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords Sheet</TabsTrigger>
            <TabsTrigger value="pages">SEO Pages</TabsTrigger>
            <TabsTrigger value="settings">SEO Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* SEO Strategy Writer Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  SEO Strategy Writer
                </CardTitle>
                <CardDescription>
                  Generate AI-powered SEO content and images using OpenAI GPT-4o
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Upload CSV files with keywords and intents to automatically generate SEO-optimized pages with custom content and images for Imunofan pharmaceutical products.
                </p>
                <Button
                  onClick={() => window.location.href = "/admin/seo-strategy"}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Open SEO Strategy Writer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Sheet Tab */}
          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Keywords Database
                </CardTitle>
                <CardDescription>
                  View and manage all SEO keywords uploaded via CSV
                </CardDescription>
              </CardHeader>
              <CardContent>
                {typedKeywords.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No keywords uploaded yet</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Upload a CSV file in the SEO Strategy Writer to see keywords here</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Keyword</TableHead>
                          <TableHead>Intent</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {typedKeywords.map((keyword: any) => (
                          <TableRow key={keyword.id}>
                            <TableCell className="font-medium">{keyword.id}</TableCell>
                            <TableCell>{keyword.keyword}</TableCell>
                            <TableCell>{keyword.intent}</TableCell>
                            <TableCell className="font-mono text-sm">{keyword.slug}</TableCell>
                            <TableCell>{new Date(keyword.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated SEO Pages</CardTitle>
                <CardDescription>
                  Manage AI-generated content for each keyword
                </CardDescription>
              </CardHeader>
              <CardContent>
                {typedPages.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No SEO pages generated yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>URL/Slug</TableHead>
                          <TableHead>Published</TableHead>
                          <TableHead>Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {typedPages.map((page: any) => (
                          <TableRow key={page.id}>
                            <TableCell className="font-medium">{page.id}</TableCell>
                            <TableCell className="max-w-xs truncate">{page.title}</TableCell>
                            <TableCell>
                              {page.slug ? (
                                <a 
                                  href={`/${page.slug}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline font-mono text-sm"
                                >
                                  /{page.slug}
                                </a>
                              ) : (
                                <span className="text-gray-400">No slug</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                page.published 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                              }`}>
                                {page.published ? 'Published' : 'Draft'}
                              </span>
                            </TableCell>
                            <TableCell>{new Date(page.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  SEO Management Settings
                </CardTitle>
                <CardDescription>
                  Control daily page creation limits and automation settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Daily Page Creation Limits</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dailyLimit">Daily Limit</Label>
                      <Input
                        id="dailyLimit"
                        type="number"
                        min="1"
                        max="100"
                        value={seoSettings?.dailyPageLimit || dailyLimit}
                        onChange={(e) => setDailyLimit(parseInt(e.target.value))}
                        placeholder="10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pages Created Today</Label>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-2xl font-bold text-blue-600">
                          {seoSettings?.pagesCreatedToday || 0}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          / {seoSettings?.dailyPageLimit || 10}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Last Reset</Label>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                        {seoSettings?.lastResetDate 
                          ? new Date(seoSettings.lastResetDate).toLocaleDateString()
                          : 'Not set'
                        }
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoGeneration"
                      checked={seoSettings?.autoGeneration !== undefined ? seoSettings.autoGeneration : autoGeneration}
                      onCheckedChange={setAutoGeneration}
                    />
                    <Label htmlFor="autoGeneration">Enable automatic page generation</Label>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => updateSettingsMutation.mutate({
                        dailyPageLimit: dailyLimit,
                        autoGeneration: autoGeneration
                      })}
                      disabled={updateSettingsMutation.isPending}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {updateSettingsMutation.isPending ? 'Updating...' : 'Update Settings'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => resetDailyMutation.mutate()}
                      disabled={resetDailyMutation.isPending}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {resetDailyMutation.isPending ? 'Resetting...' : 'Reset Daily Count'}
                    </Button>
                  </div>
                </div>

                {/* AI Content Generation Settings */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-medium">AI Content Generation for Symptoms</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aiPrompt">AI Prompt Template</Label>
                      <textarea
                        id="aiPrompt"
                        className="w-full min-h-[100px] p-3 border rounded-md resize-y"
                        placeholder="За {keyword}: Създайте професионален медицински текст за симптомите и лечението с Имунофан пептиди..."
                        defaultValue={seoSettings?.aiPromptTemplate || "За {keyword}: Създайте професионален медицински текст за симптомите и лечението с Имунофан пептиди. Фокусирайте се върху {intent}. Включете препоръки за използване на българската фармацевтична продукция."}
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use {'{keyword}'} and {'{intent}'} as placeholders for dynamic content
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="aiTone">Content Tone</Label>
                        <select
                          id="aiTone"
                          className="w-full p-2 border rounded-md"
                          defaultValue={seoSettings?.aiTone || "professional"}
                        >
                          <option value="professional">Professional</option>
                          <option value="empathetic">Empathetic</option>
                          <option value="authoritative">Authoritative</option>
                          <option value="conversational">Conversational</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aiLength">Content Length</Label>
                        <select
                          id="aiLength"
                          className="w-full p-2 border rounded-md"
                          defaultValue={seoSettings?.aiLength || "detailed"}
                        >
                          <option value="concise">Concise (300-500 words)</option>
                          <option value="detailed">Detailed (500-800 words)</option>
                          <option value="comprehensive">Comprehensive (800+ words)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aiLanguage">Language</Label>
                        <select
                          id="aiLanguage"
                          className="w-full p-2 border rounded-md"
                          defaultValue={seoSettings?.aiLanguage || "bulgarian"}
                        >
                          <option value="bulgarian">Bulgarian</option>
                          <option value="english">English</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        const aiPrompt = (document.getElementById('aiPrompt') as HTMLTextAreaElement)?.value;
                        const aiTone = (document.getElementById('aiTone') as HTMLSelectElement)?.value;
                        const aiLength = (document.getElementById('aiLength') as HTMLSelectElement)?.value;
                        const aiLanguage = (document.getElementById('aiLanguage') as HTMLSelectElement)?.value;
                        
                        updateSettingsMutation.mutate({
                          aiPromptTemplate: aiPrompt,
                          aiTone,
                          aiLength,
                          aiLanguage
                        });
                      }}
                      disabled={updateSettingsMutation.isPending}
                      className="w-full md:w-auto"
                    >
                      Update AI Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Product Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Overview
              </CardTitle>
              <CardDescription>
                Current product catalog status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {typedProducts.length > 0 ? (
                  typedProducts.map((product: any) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.type} - {product.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.inStock 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No products found. Database may need to be seeded.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                System Status
              </CardTitle>
              <CardDescription>
                Current system health and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm font-medium">Database Connection</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm font-medium">Admin Authentication</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-sm font-medium">E-commerce Platform</span>
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full">
                    Running
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}