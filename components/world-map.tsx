'use client';

import { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CountryStats } from '@/lib/types';
import { Globe } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// GeoJSON URL for world map
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  stats: CountryStats[];
  maxCount: number;
  onCountryClick: (countryCode: string) => void;
}

export function WorldMap({ stats, maxCount, onCountryClick }: WorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Create a map of country codes to user counts
  const countryDataMap = new Map(
    stats.map((stat) => [stat.code, stat.userCount])
  );

  // Get color based on user count (scaled 0-1)
  const getCountryColor = (geo: any) => {
    const iso2 = geo.properties.ISO_A2;
    const userCount = countryDataMap.get(iso2) || 0;

    if (userCount === 0) {
      return 'oklch(0.22 0.02 265)'; // Dark gray for no users
    }

    // Calculate intensity (0 to 1)
    const intensity = maxCount > 0 ? Math.min(userCount / maxCount, 1) : 0;

    // Color scale from low (teal) to high (purple/blue)
    if (intensity < 0.3) {
      return `oklch(${0.50 + intensity * 0.3} 0.15 190)`; // Teal tones
    } else if (intensity < 0.7) {
      return `oklch(${0.55 + intensity * 0.2} 0.20 240)`; // Blue tones
    } else {
      return `oklch(${0.60 + intensity * 0.15} 0.25 265)`; // Purple/violet tones
    }
  };

  const handleCountryClick = (geo: any) => {
    const iso2 = geo.properties.ISO_A2;
    const userCount = countryDataMap.get(iso2) || 0;

    if (userCount > 0) {
      onCountryClick(iso2);
    }
  };

  const handleMouseEnter = (geo: any) => {
    const iso2 = geo.properties.ISO_A2;
    const countryName = geo.properties.NAME;
    const userCount = countryDataMap.get(iso2) || 0;

    if (userCount > 0) {
      setTooltipContent(`${countryName}: ${userCount} users`);
    } else {
      setTooltipContent(countryName);
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Globe className="h-6 w-6 text-primary" />
          Global Activity Map
        </CardTitle>
        <CardDescription className="text-base">
          Click on a country to view its leaderboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[500px] w-full rounded-lg" />
        ) : (
          <div className="relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 147,
              }}
              className="w-full rounded-lg bg-background/50"
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup center={[0, 20]} zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const iso2 = geo.properties.ISO_A2;
                      const userCount = countryDataMap.get(iso2) || 0;
                      const hasUsers = userCount > 0;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getCountryColor(geo)}
                          stroke="oklch(0.15 0.015 265)"
                          strokeWidth={0.5}
                          style={{
                            default: {
                              outline: 'none',
                            },
                            hover: {
                              fill: hasUsers
                                ? 'oklch(0.75 0.25 265)'
                                : 'oklch(0.30 0.02 265)',
                              outline: 'none',
                              cursor: hasUsers ? 'pointer' : 'default',
                            },
                            pressed: {
                              fill: 'oklch(0.65 0.22 265)',
                              outline: 'none',
                            },
                          }}
                          onMouseEnter={() => handleMouseEnter(geo)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleCountryClick(geo)}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            {tooltipContent && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-popover px-4 py-2 text-sm text-popover-foreground shadow-lg">
                {tooltipContent}
              </div>
            )}

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <span className="text-muted-foreground">User Density:</span>
              <div className="flex items-center gap-2">
                <div className="h-4 w-8 rounded" style={{ background: 'oklch(0.50 0.15 190)' }} />
                <span className="text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-8 rounded" style={{ background: 'oklch(0.60 0.20 240)' }} />
                <span className="text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-8 rounded" style={{ background: 'oklch(0.70 0.25 265)' }} />
                <span className="text-muted-foreground">High</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
