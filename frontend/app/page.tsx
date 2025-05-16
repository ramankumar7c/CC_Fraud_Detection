'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Github, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [distanceFromHome, setDistanceFromHome] = useState('');
  const [distanceFromLastTransaction, setDistanceFromLastTransaction] = useState('');
  const [ratioToMedianPurchase, setRatioToMedianPurchase] = useState('');
  const [usedChip, setUsedChip] = useState(false);
  const [usedPin, setUsedPin] = useState(false);
  const [onlineOrder, setOnlineOrder] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
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
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black p-4">
      <div className="max-w-2xl mx-auto pt-4">
        <div className="text-center mb-4 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">AI-Powered</h1>
          <h2 className="text-2xl font-semibold tracking-tight">
            <span className="text-white">Credit Card Fraud</span>{' '}
            <span className="text-green-400">Detection System</span>
          </h2>
          <p className="text-green-300 mt-2 text-base">
            Instantly assess transaction risk using advanced machine learning
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-md border-green-800/50 p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-green-400 text-sm" htmlFor="distanceFromHome">
                Distance from Home
              </Label>
              <Input
                id="distanceFromHome"
                type="number"
                className="bg-green-950/50 border-green-800/50 text-green-100 h-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/50"
                placeholder="Enter distance in miles"
                value={distanceFromHome}
                onChange={(e) => setDistanceFromHome(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-green-400 text-sm" htmlFor="distanceFromLastTransaction">
                Distance from Last Transaction
              </Label>
              <Input
                id="distanceFromLastTransaction"
                type="number"
                className="bg-green-950/50 border-green-800/50 text-green-100 h-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/50"
                placeholder="Enter distance in miles"
                value={distanceFromLastTransaction}
                onChange={(e) => setDistanceFromLastTransaction(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-green-400 text-sm" htmlFor="ratioToMedianPurchase">
                Ratio to Median Purchase
              </Label>
              <Input
                id="ratioToMedianPurchase"
                type="number"
                className="bg-green-950/50 border-green-800/50 text-green-100 h-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/50"
                placeholder="Enter ratio"
                value={ratioToMedianPurchase}
                onChange={(e) => setRatioToMedianPurchase(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-green-400 text-sm">Transaction Attributes</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center space-x-2 bg-green-950/30 p-2 rounded-lg">
                  <Switch
                    id="usedChip"
                    checked={usedChip}
                    onCheckedChange={setUsedChip}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <Label className="text-green-200 text-sm" htmlFor="usedChip">Used Chip</Label>
                </div>

                <div className="flex items-center space-x-2 bg-green-950/30 p-2 rounded-lg">
                  <Switch
                    id="usedPin"
                    checked={usedPin}
                    onCheckedChange={setUsedPin}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <Label className="text-green-200 text-sm" htmlFor="usedPin">Used PIN</Label>
                </div>

                <div className="flex items-center space-x-2 bg-green-950/30 p-2 rounded-lg">
                  <Switch
                    id="onlineOrder"
                    checked={onlineOrder}
                    onCheckedChange={setOnlineOrder}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <Label className="text-green-200 text-sm" htmlFor="onlineOrder">Online Order</Label>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white h-10 text-base font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Analyzing...
              </div>
            ) : (
              'Analyze Transaction'
            )}
          </Button>
        </Card>

        {error && (
          <div className="mt-4 text-center p-3 rounded-lg bg-red-500/20 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="text-red-400 w-5 h-5" />
              <span className="text-red-400 font-medium">{error}</span>
            </div>
          </div>
        )}

        {prediction && (
          <div className={`mt-4 text-center p-4 rounded-lg ${
            prediction === 'Not Fraud' ? 'bg-green-500/20' : 'bg-red-500/20'
          } animate-fade-in`}>
            <div className="flex items-center justify-center gap-2">
              {prediction === 'Not Fraud' ? (
                <CheckCircle2 className="text-green-400 w-6 h-6" />
              ) : (
                <Shield className="text-red-400 w-6 h-6" />
              )}
              <span className={`text-xl font-semibold ${
                prediction === 'Not Fraud' ? 'text-green-400' : 'text-red-400'
              }`}>
                {prediction === 'Not Fraud' ? 'Transaction is Safe' : 'Potential Fraud Detected'}
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-green-800/30">
          <div className="text-green-300/80 flex items-center justify-center gap-1.5 text-sm">
            <p>Developed with</p>
            <Heart className="h-3.5 w-3.5 text-red-400 animate-pulse" />
            <p>by</p>
            <Link 
              href="https://github.com/ramankumar7c/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors flex items-center gap-1.5"
            >
              Raman
              <Github className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}