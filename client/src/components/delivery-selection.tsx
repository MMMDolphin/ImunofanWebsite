import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Building, 
  Home,
  Zap,
  Phone,
  CheckCircle,
  Loader2
} from "lucide-react";

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  deliveryDays: string;
  type: 'office' | 'home' | 'fast';
  description: string;
}

interface EcontOffice {
  id: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  phone?: string;
  workingTime?: string;
}

interface DeliverySelectionProps {
  customerCity: string;
  orderTotal: number;
  onDeliverySelect: (delivery: {
    type: string;
    price: number;
    officeId?: string;
    officeName?: string;
  }) => void;
  selectedDelivery?: {
    type: string;
    price: number;
    officeId?: string;
    officeName?: string;
  };
}

export default function DeliverySelection({
  customerCity,
  orderTotal,
  onDeliverySelect,
  selectedDelivery
}: DeliverySelectionProps) {
  const [selectedOption, setSelectedOption] = useState<string>(selectedDelivery?.type || '');
  const [selectedOffice, setSelectedOffice] = useState<EcontOffice | null>(null);
  const [showOffices, setShowOffices] = useState(false);
  const { toast } = useToast();

  // Calculate shipping options
  const { data: deliveryOptions, isLoading: loadingOptions } = useQuery({
    queryKey: ['shipping-options', customerCity, orderTotal],
    queryFn: async () => {
      if (!customerCity) return [];
      
      const response = await apiRequest('POST', '/api/econt/calculate-shipping', {
        receiverCity: customerCity,
        weight: 0.3, // Standard product weight
        cashOnDelivery: 0 // Already paid online
      });
      return response as unknown as DeliveryOption[];
    },
    enabled: !!customerCity,
  });

  // Get offices for the city
  const { data: offices, isLoading: loadingOffices } = useQuery({
    queryKey: ['econt-offices', customerCity],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/econt/offices/${customerCity}`);
      return response as unknown as EcontOffice[];
    },
    enabled: !!customerCity && showOffices,
  });

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = deliveryOptions?.find(opt => opt.id === optionId);
    
    if (option) {
      if (option.type === 'office') {
        setShowOffices(true);
        // Don't call onDeliverySelect yet, wait for office selection
      } else {
        setShowOffices(false);
        setSelectedOffice(null);
        onDeliverySelect({
          type: option.id,
          price: option.price,
        });
      }
    }
  };

  const handleOfficeSelect = (office: EcontOffice) => {
    setSelectedOffice(office);
    const option = deliveryOptions?.find(opt => opt.id === selectedOption);
    
    if (option) {
      onDeliverySelect({
        type: option.id,
        price: option.price,
        officeId: office.id,
        officeName: office.name,
      });
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'office':
        return <Building className="w-5 h-5" />;
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'fast':
        return <Zap className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  if (!customerCity) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>Опции за доставка</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Моля, въведете града за доставка, за да видите наличните опции.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="w-5 h-5" />
          <span>Доставка с Еконт</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadingOptions ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Зареждане на опции за доставка...</span>
          </div>
        ) : deliveryOptions && deliveryOptions.length > 0 ? (
          <>
            <div className="space-y-3">
              <Label className="text-base font-semibold">Изберете начин на доставка:</Label>
              <RadioGroup
                value={selectedOption}
                onValueChange={handleOptionSelect}
                className="space-y-3"
              >
                {deliveryOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <label 
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer"
                    >
                      <Card className={`transition-all ${
                        selectedOption === option.id 
                          ? 'ring-2 ring-medical-blue border-medical-blue' 
                          : 'hover:border-gray-300'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getIconForType(option.type)}
                              <span className="font-semibold">{option.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">{option.price.toFixed(2)} лв.</div>
                              <div className="text-sm text-gray-600 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {option.deliveryDays}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </CardContent>
                      </Card>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Office Selection */}
            {showOffices && selectedOption === 'office' && (
              <div className="mt-6 border-t pt-6">
                <Label className="text-base font-semibold mb-3 block">
                  Изберете офис на Еконт в {customerCity}:
                </Label>
                
                {loadingOffices ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span>Зареждане на офиси...</span>
                  </div>
                ) : offices && offices.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {offices.map((office) => (
                      <Card 
                        key={office.id}
                        className={`cursor-pointer transition-all ${
                          selectedOffice?.id === office.id
                            ? 'ring-2 ring-green-500 border-green-500'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => handleOfficeSelect(office)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <MapPin className="w-4 h-4 text-medical-blue" />
                                <span className="font-semibold">{office.name}</span>
                                {selectedOffice?.id === office.id && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                {office.address}, {office.postCode} {office.city}
                              </p>
                              {office.workingTime && (
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {office.workingTime}
                                </p>
                              )}
                              {office.phone && (
                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {office.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>Няма намерени офиси в този град.</p>
                    <p className="text-sm">Моля, изберете доставка до адрес.</p>
                  </div>
                )}
              </div>
            )}

            {/* Selected delivery summary */}
            {selectedDelivery && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Избрана доставка:</span>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Тип:</strong> {
                      deliveryOptions?.find(opt => opt.id === selectedDelivery.type)?.name
                    }
                  </p>
                  <p><strong>Цена:</strong> {selectedDelivery.price.toFixed(2)} лв.</p>
                  {selectedDelivery.officeName && (
                    <p><strong>Офис:</strong> {selectedDelivery.officeName}</p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <Truck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="font-semibold mb-2">Няма налични опции за доставка</h3>
            <p className="text-sm">
              Моля, проверете дали градът е въведен правилно или се свържете с нас.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 