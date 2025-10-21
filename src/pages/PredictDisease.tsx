import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { diseases } from "@/lib/diseaseData";
import { calculatePatientRisks } from "@/lib/predictions";
import { ArrowLeft, User, FileDown, Activity, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PredictDisease = () => {
  const { diseaseId } = useParams();
  const { toast } = useToast();
  const disease = diseases.find(d => d.id === diseaseId);
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);

  if (!disease) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Disease Not Found</h1>
          <Link to="/dashboard">
            <Button className="gradient-primary rounded-full">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    setAttempted(true);
    // Require ALL defined fields to have a value before calculating
    const missing = disease.fields.filter(f => !formData[f] || formData[f].toString().trim() === '');
    if (missing.length) {
      toast({
        title: "Incomplete Form",
        description: `Please fill all fields before calculating risk (missing: ${missing.map(m => m.replace(/_/g,' ')).join(', ')})`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Convert form data to match prediction model expectations
      const patientData: Record<string, any> = { ...formData };
      
      // Ensure numeric fields are properly converted
      Object.keys(patientData).forEach(key => {
        const value = patientData[key];
        if (value && !isNaN(Number(value)) && value !== '') {
          patientData[key] = Number(value);
        }
      });
      
      console.log('Submitting patient data:', patientData);
      const allResults = calculatePatientRisks(patientData);
      console.log('All prediction results:', allResults);
      
      // Match disease by ID or name
      const diseaseResult = allResults.find(r => {
        const normalizedDiseaseName = r.disease.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        return normalizedDiseaseName === diseaseId || r.disease.toLowerCase() === disease?.name?.toLowerCase();
      });
      
      console.log('Found disease result:', diseaseResult);
      
      if (diseaseResult) {
        setResults(diseaseResult);
      } else {
        throw new Error(`No prediction model found for ${disease?.name}`);
      }
      
      toast({
        title: "Prediction Complete",
        description: `Risk assessment for ${disease.name} has been calculated.`,
      });
    } catch (error) {
      toast({
        title: "Prediction Error",
        description: "There was an error calculating the risk. Please check your inputs.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (category: string) => {
    switch (category) {
      case 'No Risk': return 'text-green-600 bg-green-50 border-green-200';
      case 'Low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'No Risk': return <CheckCircle className="w-5 h-5" />;
      case 'Low': return <CheckCircle className="w-5 h-5" />;
      case 'Medium': return <AlertCircle className="w-5 h-5" />;
      case 'High': return <AlertCircle className="w-5 h-5" />;
      default: return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-all">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <img
                src="/assests/logo.png"
                alt="Vitalyze"
                className="h-[150px] object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{disease.name} Risk Assessment</h1>
            <p className="text-lg text-muted-foreground">Enter your health information to get a personalized risk assessment</p>
          </div>

          <div className={`grid ${results ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
            {/* Input Form */}
            <div className="relative">
              <Card className="relative border-2 border-transparent bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F7CB05] to-[#52F705]"></div>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-[#F7CB05]/10 to-[#52F705]/10 rounded-lg">
                      <Activity className="w-6 h-6 text-[#F7CB05]" />
                    </div>
                    <span className="bg-gradient-to-r from-[#F7CB05] to-[#52F705] bg-clip-text text-transparent">Health Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
                  {disease.fields.map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field} className="text-sm font-semibold text-gray-700">{field.replace(/_/g, ' ')}</Label>
                      {field === 'Gender' ? (
                        <Select onValueChange={(value) => handleInputChange(field, value)}>
                          <SelectTrigger className="border-2 focus:border-[#F7CB05] focus:ring-2 focus:ring-[#F7CB05]/20 transition-all rounded-lg">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : field.includes('History') || field.includes('_Type') || field.includes('_Level') ? (
                        <Select onValueChange={(value) => handleInputChange(field, value)}>
                          <SelectTrigger className="border-2 focus:border-[#F7CB05] focus:ring-2 focus:ring-[#F7CB05]/20 transition-all rounded-lg">
                            <SelectValue placeholder={`Select ${field.replace(/_/g, ' ').toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No/None/Low</SelectItem>
                            <SelectItem value="1">Yes/Mild/Medium</SelectItem>
                            <SelectItem value="2">Severe/High</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field}
                          type="number"
                          placeholder={`Enter ${field.replace(/_/g, ' ').toLowerCase()}`}
                          value={formData[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="border-2 focus:border-[#F7CB05] focus:ring-2 focus:ring-[#F7CB05]/20 transition-all rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                  
                  <Button 
                    onClick={handlePredict} 
                    disabled={isLoading || disease.fields.some(f => !formData[f] || formData[f].toString().trim() === '')}
                    className="w-full bg-[#F7CB05] hover:bg-[#52F705] text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                      </span>
                    ) : 'Calculate Risk'}
                  </Button>
                  {attempted && disease.fields.some(f => !formData[f] || formData[f].toString().trim() === '') && (
                    <p className="text-xs text-destructive mt-2 text-center font-medium">⚠️ All fields are required to generate a prediction.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results - Only show when results exist */}
            {results && (
            <div className="relative">
              <Card className="relative border-2 border-transparent bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F7CB05] to-[#52F705]"></div>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-[#F7CB05]/10 to-[#52F705]/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-[#F7CB05]" />
                    </div>
                    <span className="bg-gradient-to-r from-[#F7CB05] to-[#52F705] bg-clip-text text-transparent">Risk Assessment Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[540px] flex items-center justify-center">
                  <div className="space-y-6 w-full">
                    {/* Risk Score */}
                    <div className="text-center p-6 bg-gradient-to-br from-[#F7CB05]/5 to-[#52F705]/5 rounded-xl">
                      <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-[#F7CB05] to-[#52F705] bg-clip-text text-transparent">{results.riskScore}%</div>
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 ${getRiskColor(results.riskCategory)} shadow-md`}>
                        {getRiskIcon(results.riskCategory)}
                        <span className="font-bold text-sm">{results.riskCategory} Risk</span>
                      </div>
                    </div>

                    {/* Feature Importance */}
                    <div className="bg-gray-50 rounded-xl p-5">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-[#F7CB05] to-[#52F705] rounded-full"></div>
                        Key Risk Factors
                      </h4>
                      <div className="space-y-3">
                        {results.featureImportance?.map((item: any, index: number) => (
                          <div key={index} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-semibold text-gray-700">{item.feature}</span>
                              <span className="text-sm font-bold text-[#F7CB05]">{item.importance}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-[#F7CB05] to-[#52F705] h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{width: `${Math.round(Math.min(100, Math.max(0, item.importance || 0)))}%`}}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-100">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2.5">
                        {results.recommendations?.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-3 text-sm text-green-900 bg-white/60 rounded-lg p-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-900 mb-1">Medical Disclaimer</p>
                          <p className="text-xs text-amber-800 leading-relaxed">
                            This is an AI-generated risk assessment and should not replace professional medical advice. 
                            Please consult with a healthcare provider for proper diagnosis and treatment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Rishabh Kumar Jha Productions. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PredictDisease;