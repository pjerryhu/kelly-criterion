"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Calculator() {
  const [probabilityOfSuccess, setProbabilityOfSuccess] = useState("");
  const [winRate, setWinRate] = useState("");
  const [lossRate, setLossRate] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [kellyFraction, setKellyFraction] = useState<number | null>(null);

  const calculateValues = () => {
    const p = parseFloat(probabilityOfSuccess);
    const w = parseFloat(winRate);
    const l = parseFloat(lossRate);

    if (isNaN(p) || isNaN(w) || isNaN(l)) {
      alert("Please enter valid numbers for all fields");
      return;
    }

    if (p < 0 || p > 1) {
      alert("Probability of success must be between 0 and 1");
      return;
    }

    // Calculate Portfolio Size
    const expectedValue = p * w - (1 - p) * l;
    setResult(expectedValue);

    // Calculate Kelly Criterion
    const q = 1 - p; // probability of failure
    const kellyFraction = p / l - q / w;
    setKellyFraction(Math.max(0, kellyFraction) * 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateValues();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Static Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="probabilityOfSuccess">
              Probability of Success (0-1)
            </Label>
            <Input
              id="probabilityOfSuccess"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={probabilityOfSuccess}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProbabilityOfSuccess(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Enter probability (0-1)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="winRate">Win Rate (%)</Label>
            <Input
              id="winRate"
              type="number"
              value={winRate}
              onChange={(e) => setWinRate(e.target.value)}
              placeholder="Enter win rate (%)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lossRate">Loss Rate (%)</Label>
            <Input
              id="lossRate"
              type="number"
              value={lossRate}
              onChange={(e) => setLossRate(e.target.value)}
              placeholder="Enter loss rate (%)"
            />
          </div>
          <Button onClick={calculateValues} className="w-full">
            Calculate
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {kellyFraction !== null && (
            <div className="p-4 bg-gray-100 rounded-md">
              <p className="text-center font-semibold">
                Kelly Criterion (Optimal Bet Size):{" "}
                <span className="text-green-600">
                  {(kellyFraction * 100).toFixed(2)}%
                </span>
              </p>
              <p className="text-center mt-2 text-sm text-gray-600">
                This suggests betting {(kellyFraction * 100).toFixed(2)}% of
                your bankroll.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
