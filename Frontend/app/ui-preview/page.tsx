"use client";

import * as React from "react";
import { ChevronRight, Home, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function UiPreviewPage() {
  const [progress, setProgress] = React.useState(40);

  React.useEffect(() => {
    const t = setTimeout(() => setProgress(75), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <TooltipProvider>
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">UI Preview</h1>
          <p className="text-muted-foreground">Browse your reusable components at <code>/ui-preview</code>.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buttons, Badges, Toggle</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Badge>New</Badge>
            <Toggle>Bold</Toggle>
            <ToggleGroup type="single">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Type here..." />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="airplane">Airplane mode</Label>
                <Switch id="airplane" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Slider</Label>
              <Slider defaultValue={[35]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label>Plan</Label>
              <RadioGroup defaultValue="pro" className="flex gap-4">
                <div className="flex items-center gap-2"><RadioGroupItem value="free" id="free" /><Label htmlFor="free">Free</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="pro" id="pro" /><Label htmlFor="pro">Pro</Label></div>
              </RadioGroup>
            </div>
            <div className="w-56">
              <Select>
                <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">US</SelectItem>
                  <SelectItem value="eu">EU</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overlays & Menus</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>Example dialog preview.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Dropdown</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
              <PopoverContent>Popover content preview</PopoverContent>
            </Popover>
            <HoverCard>
              <HoverCardTrigger asChild><Button variant="outline">Hover card</Button></HoverCardTrigger>
              <HoverCardContent>Hover me to preview content.</HoverCardContent>
            </HoverCard>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Tooltip</Button></TooltipTrigger>
              <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Layout & Data</CardTitle>
            <CardDescription>Tabs, table, breadcrumb, accordion, collapsible, scroll area.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#"><Home className="h-4 w-4" /></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbPage>UI Preview</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Tabs defaultValue="table">
              <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="accordion">Accordion</TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <Table>
                  <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead></TableRow></TableHeader>
                  <TableBody><TableRow><TableCell>Ana</TableCell><TableCell>Admin</TableCell></TableRow></TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="accordion">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is this page?</AccordionTrigger>
                    <AccordionContent>A quick visual index of your UI components.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
            <Collapsible>
              <CollapsibleTrigger asChild><Button variant="outline">Toggle Collapsible</Button></CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm text-muted-foreground">Collapsible content preview.</CollapsibleContent>
            </Collapsible>
            <ScrollArea className="h-24 rounded-md border p-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-sm">Scrollable row {i + 1}</p>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visual Primitives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>This is an alert component preview.</AlertDescription>
            </Alert>
            <div className="flex items-center gap-4">
              <Avatar><AvatarFallback><User className="h-4 w-4" /></AvatarFallback></Avatar>
              <div className="w-48"><Progress value={progress} /></div>
            </div>
            <AspectRatio ratio={16 / 9} className="rounded-md bg-muted flex items-center justify-center text-sm text-muted-foreground">
              16:9 Aspect Ratio
            </AspectRatio>
            <Separator />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-40" />
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  );
}
