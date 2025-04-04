'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default function Home() {
  const [distanceFromHome, setDistanceFromHome] = useState('');
  const [distanceFromLastTransaction, setDistanceFromLastTransaction] = useState('');
  const [ratioToMedianPurchase, setRatioToMedianPurchase] = useState('');
  const [usedChip, setUsedChip] = useState(false);
  const [usedPin, setUsedPin] = useState(false);
  const [onlineOrder, setOnlineOrder] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const features = [
        parseFloat(distanceFromHome),
        parseFloat(distanceFromLastTransaction),
        parseFloat(ratioToMedianPurchase),
        usedChip ? 1 : 0,
        usedPin ? 1 : 0,
        onlineOrder ? 1 : 0
      ];

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features }),
      });

      const data = await response.json();
      if (data.prediction !== undefined) {
        setPrediction(data.prediction === 1 ? 'Fraud' : 'Not Fraud');
      } else {
        setPrediction('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI-Powered</h1>
          <h2 className="text-2xl font-semibold">
            <span className="text-white">Credit Card Fraud</span>{' '}
            <span className="text-green-400">Detection System</span>
          </h2>
          <p className="text-green-300 mt-2">
            Instantly assess transaction risk using smart analytics
          </p>
        </div>

        <Card className="bg-black/30 backdrop-blur-sm border-green-800/50 p-6 space-y-4">
          <div>
            <Label className="text-green-400" htmlFor="distanceFromHome">
              Distance from Home
            </Label>
            <Input
              id="distanceFromHome"
              type="number"
              className="bg-green-950/50 border-green-800/50 text-green-100"
              placeholder="Enter distance in miles"
              value={distanceFromHome}
              onChange={(e) => setDistanceFromHome(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-green-400" htmlFor="distanceFromLastTransaction">
              Distance from Last Transaction
            </Label>
            <Input
              id="distanceFromLastTransaction"
              type="number"
              className="bg-green-950/50 border-green-800/50 text-green-100"
              placeholder="Enter distance in miles"
              value={distanceFromLastTransaction}
              onChange={(e) => setDistanceFromLastTransaction(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-green-400" htmlFor="ratioToMedianPurchase">
              Ratio to Median Purchase
            </Label>
            <Input
              id="ratioToMedianPurchase"
              type="number"
              className="bg-green-950/50 border-green-800/50 text-green-100"
              placeholder="Enter ratio"
              value={ratioToMedianPurchase}
              onChange={(e) => setRatioToMedianPurchase(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-green-400">Transaction Attributes</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="usedChip"
                  checked={usedChip}
                  onCheckedChange={setUsedChip}
                  className="data-[state=checked]:bg-green-500"
                />
                <Label className="text-green-200" htmlFor="usedChip">Used Chip</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="usedPin"
                  checked={usedPin}
                  onCheckedChange={setUsedPin}
                  className="data-[state=checked]:bg-green-500"
                />
                <Label className="text-green-200" htmlFor="usedPin">Used PIN</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="onlineOrder"
                  checked={onlineOrder}
                  onCheckedChange={setOnlineOrder}
                  className="data-[state=checked]:bg-green-500"
                />
                <Label className="text-green-200" htmlFor="onlineOrder">Online Order</Label>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Transaction'}
          </Button>
        </Card>

        {prediction && (
          <div className={`mt-6 text-center p-4 rounded-lg ${
            prediction === 'Not Fraud' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <div className="flex items-center justify-center gap-2">
              <Shield className={prediction === 'Not Fraud' ? 'text-green-400' : 'text-red-400'} />
              <span className={`text-xl font-semibold ${
                prediction === 'Not Fraud' ? 'text-green-400' : 'text-red-400'
              }`}>
                Prediction: {prediction}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
