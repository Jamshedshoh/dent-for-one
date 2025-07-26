import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Bluetooth,
  Smartphone,
  RefreshCw,
  Plus,
  Trash2,
  Battery,
  Wifi,
  RotateCw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Devices() {
  const [scanning, setScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: "SmartBrush X3",
      type: "Electric Toothbrush",
      battery: 68,
      connected: true,
      lastSync: "Today, 08:32 AM",
    },
    {
      id: 2,
      name: "WaterFlosser Pro",
      type: "Water Flosser",
      battery: 45,
      connected: true,
      lastSync: "Yesterday, 09:15 PM",
    },
  ]);

  const startScan = () => {
    setScanning(true);
    toast.info("Scanning for nearby devices...");

    // Simulate finding a device after 3 seconds
    setTimeout(() => {
      setScanning(false);
      toast.success("New device found! Connect to pair.");
    }, 3000);
  };

  const toggleDeviceConnection = (deviceId: number) => {
    setConnectedDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId
          ? { ...device, connected: !device.connected }
          : device
      )
    );

    // Get the device name
    const device = connectedDevices.find((d) => d.id === deviceId);
    if (device) {
      const action = device.connected ? "disconnected from" : "connected to";
      toast.success(`Successfully ${action} ${device.name}`);
    }
  };

  const refreshDevice = (deviceId: number) => {
    // Get the device name
    const device = connectedDevices.find((d) => d.id === deviceId);
    if (device) {
      toast.success(`Syncing data with ${device.name}...`);
    }
  };

  const forgetDevice = (deviceId: number) => {
    // Get the device name before removing
    const device = connectedDevices.find((d) => d.id === deviceId);

    setConnectedDevices((prevDevices) =>
      prevDevices.filter((device) => device.id !== deviceId)
    );

    if (device) {
      toast.success(`${device.name} has been removed`);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      <main className="container px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Bluetooth className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Connect Devices</h2>
        </div>

        {/* Device Scanning Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pair New Device</CardTitle>
            <CardDescription>
              Connect your smart dental devices to track your oral health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-col md:flex-row md:items-center">
              <div className="flex-1 space-y-2">
                <p className="text-sm">
                  Make sure your device is turned on and in pairing mode before
                  scanning.
                </p>
                <p className="text-sm text-muted-foreground">
                  Compatible with most smart toothbrushes, water flossers, and
                  other dental care devices.
                </p>
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={startScan}
                disabled={scanning}
              >
                {scanning ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Scan for Devices
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Connected Devices</CardTitle>
              <Badge variant="outline">{connectedDevices.length} Devices</Badge>
            </div>
            <CardDescription>
              Manage your connected smart dental devices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectedDevices.length === 0 ? (
              <div className="text-center py-8">
                <Bluetooth className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">No devices connected</p>
                <Button variant="link" className="mt-2" onClick={startScan}>
                  Scan for Devices
                </Button>
              </div>
            ) : (
              connectedDevices.map((device) => (
                <Card key={device.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                        {device.type.includes("Toothbrush") ? (
                          <Smartphone className="h-6 w-6 text-primary" />
                        ) : (
                          <Wifi className="h-6 w-6 text-primary" />
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {device.type}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <Switch
                              checked={device.connected}
                              onCheckedChange={() =>
                                toggleDeviceConnection(device.id)
                              }
                            />
                            <span className="text-xs">
                              {device.connected ? "Connected" : "Disconnected"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Battery className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Battery</span>
                              <span>{device.battery}%</span>
                            </div>
                            <Progress
                              value={device.battery}
                              className="h-1.5"
                            />
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Last synchronized: {device.lastSync}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => refreshDevice(device.id)}
                          disabled={!device.connected}
                          title="Sync Data"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => forgetDevice(device.id)}
                          className="text-destructive hover:text-destructive"
                          title="Forget Device"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <div className="w-full space-y-2">
              <p className="text-sm font-medium">Device Permissions</p>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm">Allow background syncing</p>
                  <p className="text-xs text-muted-foreground">
                    Sync device data even when the app is closed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm">Usage Statistics</p>
                  <p className="text-xs text-muted-foreground">
                    Share anonymous usage data to improve our service
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
