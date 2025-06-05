import axios from 'axios';
import xml2js from 'xml2js';

interface EcontOffice {
  id: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  phone?: string;
  workingTime?: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  deliveryDays: string;
  type: 'office' | 'home' | 'fast';
  description: string;
}

interface ShippingCalculation {
  receiverCity: string;
  weight: number;
  cashOnDelivery?: number;
  officeDelivery?: boolean;
}

interface ShipmentData {
  senderCity: string;
  senderAddress: string;
  senderName: string;
  senderPhone: string;
  receiverCity: string;
  receiverAddress: string;
  receiverName: string;
  receiverPhone: string;
  weight: number;
  description: string;
  cashOnDelivery?: number;
  officeCode?: string;
}

export class EcontService {
  private apiUrl: string;
  private username: string;
  private password: string;

  constructor() {
    this.apiUrl = process.env.ECONT_API_URL || 'https://demo.econt.com/ee/services/Shipments/ShipmentService.svc';
    this.username = process.env.ECONT_USERNAME || 'demo';
    this.password = process.env.ECONT_PASSWORD || 'demo';
  }

  private getAuthHeaders() {
    const auth = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    return {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  // Get all Econt offices for a specific city
  async getOffices(city: string): Promise<EcontOffice[]> {
    try {
      // Mock data for demonstration - replace with actual API call
      const mockOffices: EcontOffice[] = [
        {
          id: 'SOF001',
          name: 'Еконт офис София Център',
          address: 'бул. Витоша 15',
          city: 'София',
          postCode: '1000',
          phone: '0700 10 500',
          workingTime: 'Пон-Пет: 8:00-18:00, Съб: 9:00-17:00'
        },
        {
          id: 'SOF002', 
          name: 'Еконт офис София Люлин',
          address: 'бул. Царица Йоана 47',
          city: 'София',
          postCode: '1336',
          phone: '0700 10 500',
          workingTime: 'Пон-Пет: 8:00-18:00, Съб: 9:00-17:00'
        },
        {
          id: 'PLV001',
          name: 'Еконт офис Пловдив Център',
          address: 'бул. Съединение 2',
          city: 'Пловдив',
          postCode: '4000',
          phone: '0700 10 500',
          workingTime: 'Пон-Пет: 8:00-18:00, Съб: 9:00-17:00'
        },
        {
          id: 'VAR001',
          name: 'Еконт офис Варна Център',
          address: 'бул. Христо Ботев 12',
          city: 'Варна',
          postCode: '9000',
          phone: '0700 10 500',
          workingTime: 'Пон-Пет: 8:00-18:00, Съб: 9:00-17:00'
        }
      ];

      // Filter offices by city
      return mockOffices.filter(office => 
        office.city.toLowerCase() === city.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching Econt offices:', error);
      throw new Error('Failed to fetch delivery offices');
    }
  }

  // Calculate shipping cost and delivery options
  async calculateShipping(data: ShippingCalculation): Promise<DeliveryOption[]> {
    try {
      // Mock calculation based on weight and destination
      const basePrice = 8.90; // Base delivery price in BGN
      const weightMultiplier = data.weight > 1 ? (data.weight - 1) * 2 : 0;
      
      // Different delivery options
      const options: DeliveryOption[] = [
        {
          id: 'office',
          name: 'До офис на Еконт',
          price: basePrice + weightMultiplier,
          deliveryDays: '1-2 работни дни',
          type: 'office',
          description: 'Получаване от офис на Еконт във вашия град'
        },
        {
          id: 'home',
          name: 'До адрес',
          price: basePrice + weightMultiplier + 3, // +3 BGN for home delivery
          deliveryDays: '1-3 работни дни',
          type: 'home',
          description: 'Доставка директно до вашия адрес'
        },
        {
          id: 'fast',
          name: 'Бърза доставка',
          price: basePrice + weightMultiplier + 8, // +8 BGN for fast delivery
          deliveryDays: 'до края на работния ден',
          type: 'fast',
          description: 'Експресна доставка до адрес до края на деня'
        }
      ];

      // Add COD fee if cash on delivery
      if (data.cashOnDelivery && data.cashOnDelivery > 0) {
        const codFee = Math.max(3, data.cashOnDelivery * 0.015); // 1.5% min 3 BGN
        options.forEach(option => {
          option.price += codFee;
          option.description += ` (вкл. такса наложен платеж: ${codFee.toFixed(2)} лв.)`;
        });
      }

      return options;
    } catch (error) {
      console.error('Error calculating shipping:', error);
      throw new Error('Failed to calculate shipping cost');
    }
  }

  // Create a shipment label
  async createShipment(data: ShipmentData): Promise<{ shipmentNumber: string; labelUrl: string }> {
    try {
      // Mock shipment creation - replace with actual API call
      const shipmentNumber = `EC${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      // In a real implementation, this would generate an actual label
      const labelUrl = `/api/econt/label/${shipmentNumber}`;

      console.log('Created Econt shipment:', {
        shipmentNumber,
        sender: `${data.senderName}, ${data.senderAddress}`,
        receiver: `${data.receiverName}, ${data.receiverAddress}`,
        weight: data.weight,
        cod: data.cashOnDelivery
      });

      return {
        shipmentNumber,
        labelUrl
      };
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw new Error('Failed to create shipment');
    }
  }

  // Track a shipment
  async trackShipment(shipmentNumber: string): Promise<any> {
    try {
      // Mock tracking data - replace with actual API call
      const trackingStates = [
        'Приета за обработка',
        'В транзит',
        'В офис за получаване',
        'Доставена'
      ];

      return {
        shipmentNumber,
        status: trackingStates[Math.floor(Math.random() * trackingStates.length)],
        lastUpdate: new Date().toISOString(),
        events: [
          {
            date: new Date(Date.now() - 86400000).toISOString(),
            status: 'Приета за обработка',
            location: 'София'
          },
          {
            date: new Date().toISOString(),
            status: 'В транзит',
            location: 'Пловдив'
          }
        ]
      };
    } catch (error) {
      console.error('Error tracking shipment:', error);
      throw new Error('Failed to track shipment');
    }
  }

  // Validate address and get suggestions
  async validateAddress(city: string, address: string): Promise<{ valid: boolean; suggestions?: string[] }> {
    try {
      // Mock address validation - replace with actual API call
      const validCities = ['София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора', 'Плевен', 'Благоевград'];
      
      const isValidCity = validCities.some(validCity => 
        validCity.toLowerCase().includes(city.toLowerCase()) || 
        city.toLowerCase().includes(validCity.toLowerCase())
      );

      return {
        valid: isValidCity && address.length > 5,
        suggestions: isValidCity ? [] : validCities.filter(c => 
          c.toLowerCase().includes(city.toLowerCase().substring(0, 3))
        )
      };
    } catch (error) {
      console.error('Error validating address:', error);
      return { valid: false };
    }
  }
} 