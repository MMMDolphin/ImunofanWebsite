import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Upload, FileText, Brain, Image, Globe, CheckCircle, XCircle } from "lucide-react";

const singleKeywordSchema = z.object({
  keyword: z.string().min(1, "Keyword is required"),
  intent: z.string().min(1, "Intent is required"),
});

type SingleKeywordForm = z.infer<typeof singleKeywordSchema>;

export default function SeoStrategyWriter() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<SingleKeywordForm>({
    resolver: zodResolver(singleKeywordSchema),
    defaultValues: {
      keyword: "",
      intent: "",
    },
  });

  // Fetch SEO keywords and pages
  const { data: keywords = [] } = useQuery({
    queryKey: ["/api/admin/seo/keywords"],
  });

  const { data: pages = [] } = useQuery({
    queryKey: ["/api/admin/seo/pages"],
  });

  // CSV Upload mutation
  const csvUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('csv', file);
      
      const response = await fetch("/api/admin/seo/upload-csv", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "CSV Upload Successful",
        description: `${data.processed} keywords processed successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo/keywords"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo/pages"] });
      setCsvFile(null);
    },
    onError: (error: any) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to process CSV file",
        variant: "destructive",
      });
    },
  });

  // Single keyword generation mutation
  const singleKeywordMutation = useMutation({
    mutationFn: async (data: SingleKeywordForm) => {
      const response = await fetch("/api/admin/seo/generate-single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Generation failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "SEO Page Generated",
        description: "Content and images have been generated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo/keywords"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo/pages"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate SEO page",
        variant: "destructive",
      });
    },
  });

  // Publish page mutation
  const publishMutation = useMutation({
    mutationFn: async ({ pageId, published }: { pageId: number; published: boolean }) => {
      const response = await fetch(`/api/admin/seo/pages/${pageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ published }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Page Updated",
        description: "Page status has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo/pages"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update page",
        variant: "destructive",
      });
    },
  });

  const handleCsvUpload = () => {
    if (!csvFile) return;
    csvUploadMutation.mutate(csvFile);
  };

  const handleSingleGeneration = (data: SingleKeywordForm) => {
    singleKeywordMutation.mutate(data);
  };

  const handlePublishToggle = (pageId: number, currentStatus: boolean) => {
    publishMutation.mutate({ pageId, published: !currentStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            SEO Strategy Writer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Generate AI-powered SEO content and images for pharmaceutical keywords using OpenAI GPT-4o and DALL-E
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">CSV Upload</TabsTrigger>
            <TabsTrigger value="single">Single Keyword</TabsTrigger>
            <TabsTrigger value="manage">Manage Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Bulk CSV Upload
                </CardTitle>
                <CardDescription>
                  Upload a CSV file with keywords and intents to generate multiple SEO pages at once.
                  Format: "Keyword;Intent" (semicolon separated)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <Label htmlFor="csv-upload" className="cursor-pointer">
                    <Input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setCsvFile(file);
                      }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {csvFile ? csvFile.name : "Click to select CSV file or drag and drop"}
                    </span>
                  </Label>
                </div>
                
                {csvFile && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm font-medium">{csvFile.name}</span>
                    <Button
                      onClick={handleCsvUpload}
                      disabled={csvUploadMutation.isPending}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {csvUploadMutation.isPending ? "Processing..." : "Upload & Generate"}
                    </Button>
                  </div>
                )}

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">CSV Format Example:</h4>
                  <code className="text-sm text-yellow-700 dark:text-yellow-300">
                    Keyword;Intent<br />
                    имунотерапия за рак;лечение<br />
                    пептидна терапия;информационен<br />
                    имунофан дозировка;инструкции
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="single" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Generate Single SEO Page
                </CardTitle>
                <CardDescription>
                  Create an individual SEO page with AI-generated content and images for a specific keyword.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(handleSingleGeneration)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="keyword">SEO Keyword</Label>
                      <Input
                        id="keyword"
                        placeholder="e.g., имунотерапия за рак"
                        {...form.register("keyword")}
                      />
                      {form.formState.errors.keyword && (
                        <p className="text-sm text-red-600">{form.formState.errors.keyword.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="intent">Search Intent</Label>
                      <Input
                        id="intent"
                        placeholder="e.g., лечение, информационен, инструкции"
                        {...form.register("intent")}
                      />
                      {form.formState.errors.intent && (
                        <p className="text-sm text-red-600">{form.formState.errors.intent.message}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={singleKeywordMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {singleKeywordMutation.isPending ? "Generating Content & Images..." : "Generate SEO Page"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Manage SEO Pages
                </CardTitle>
                <CardDescription>
                  View, edit, and publish your generated SEO pages. Each page includes AI-generated content and images.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pages.length > 0 ? (
                    pages.map((page: any) => {
                      const keyword = keywords.find((k: any) => k.id === page.keywordId);
                      return (
                        <div key={page.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{page.title}</h3>
                                <Badge variant={page.published ? "default" : "secondary"}>
                                  {page.published ? "Published" : "Draft"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Keyword: <strong>{keyword?.keyword}</strong> | Intent: <strong>{keyword?.intent}</strong>
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {page.metaDescription}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {page.image1Url && (
                                <div className="flex items-center gap-1 text-sm text-green-600">
                                  <Image className="w-4 h-4" />
                                  2 Images
                                </div>
                              )}
                              <Button
                                size="sm"
                                variant={page.published ? "destructive" : "default"}
                                onClick={() => handlePublishToggle(page.id, page.published)}
                                disabled={publishMutation.isPending}
                              >
                                {page.published ? (
                                  <>
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Unpublish
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Publish
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          {page.published && (
                            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <p className="text-sm text-green-700 dark:text-green-300">
                                <Globe className="w-4 h-4 inline mr-1" />
                                Live at: <code>/seo/{keyword?.slug}</code>
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No SEO pages generated yet. Start by uploading a CSV file or creating a single page.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}