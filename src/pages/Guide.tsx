
import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Star, Clock, ArrowRight } from "lucide-react";

export default function Guide() {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-16">
      <SidebarNavigation />
      <Header />
      
      <main className="container px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Dental Health Guide</h2>
        </div>
        
        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="care">Daily Care</TabsTrigger>
            <TabsTrigger value="treatment">Treatments</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dental Basics</CardTitle>
                <CardDescription>Essential knowledge about your teeth and oral health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="overflow-hidden">
                    <CardHeader className="p-4 bg-primary/10">
                      <Badge className="w-fit mb-2">Beginner</Badge>
                      <CardTitle className="text-base">Tooth Anatomy</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Learn about the different parts of a tooth and their functions.</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>5 min read</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <CardHeader className="p-4 bg-primary/10">
                      <Badge className="w-fit mb-2">Beginner</Badge>
                      <CardTitle className="text-base">Types of Teeth</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Discover the different types of teeth and their specific roles.</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>4 min read</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <CardHeader className="p-4 bg-primary/10">
                      <Badge className="w-fit mb-2">Intermediate</Badge>
                      <CardTitle className="text-base">Common Dental Issues</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Learn about cavities, gum disease, and other common dental problems.</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>8 min read</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <CardHeader className="p-4 bg-primary/10">
                      <Badge className="w-fit mb-2">Intermediate</Badge>
                      <CardTitle className="text-base">Dental Development</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Understand how teeth develop from childhood through adulthood.</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>7 min read</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="care" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Dental Care</CardTitle>
                <CardDescription>Learn proper techniques for maintaining optimal oral health</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Brushing Techniques
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm mb-4">Proper brushing is essential for removing plaque and preventing tooth decay and gum disease.</p>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Use a soft-bristled toothbrush and fluoride toothpaste</li>
                        <li>Brush at a 45-degree angle to your gums</li>
                        <li>Use short, gentle strokes</li>
                        <li>Brush all surfaces: outer, inner, and chewing</li>
                        <li>Brush for at least 2 minutes, twice daily</li>
                        <li>Replace your toothbrush every 3-4 months</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Flossing Properly
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm mb-4">Flossing removes food particles and plaque from areas your toothbrush can't reach.</p>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Use about 18 inches of floss</li>
                        <li>Wind most of it around your middle fingers</li>
                        <li>Hold 1-2 inches between your thumbs and index fingers</li>
                        <li>Gently guide the floss between teeth using a rubbing motion</li>
                        <li>Curve the floss around each tooth in a C shape</li>
                        <li>Floss at least once daily</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Mouthwash Benefits
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm mb-4">Mouthwash can complement brushing and flossing for better oral health.</p>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Reduces plaque and gingivitis</li>
                        <li>Freshens breath</li>
                        <li>Delivers fluoride to strengthen enamel</li>
                        <li>Reaches areas brushing might miss</li>
                        <li>Choose alcohol-free options for sensitive mouths</li>
                        <li>Use as directed, typically twice daily after brushing</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Diet and Dental Health
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm mb-4">What you eat significantly impacts your oral health.</p>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Limit sugary foods and drinks</li>
                        <li>Choose water over soda and sports drinks</li>
                        <li>Eat calcium-rich foods like dairy, almonds, and leafy greens</li>
                        <li>Include phosphorus from fish, eggs, and lean meats</li>
                        <li>Vitamin C from fruits and vegetables supports gum health</li>
                        <li>Crunchy fruits and vegetables help clean teeth naturally</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="treatment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dental Treatments</CardTitle>
                <CardDescription>Information about common dental procedures and treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Fillings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Dental fillings are used to repair teeth damaged by decay. The dentist removes the decayed material, cleans the area, and fills the cavity with a filling material such as composite resin, amalgam, gold, or porcelain.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Root Canal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Root canal treatment is necessary when the pulp inside your tooth becomes infected or inflamed. The procedure involves removing the damaged pulp, cleaning the canal, and sealing it to prevent further infection.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Crowns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        A crown is a cap that covers a damaged tooth to restore its shape, size, strength, and appearance. Crowns may be needed after a large filling, root canal, or to support a dental bridge.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Orthodontics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Orthodontic treatments correct teeth alignment and bite issues using devices like braces, clear aligners, retainers, and palatal expanders to gradually shift teeth into proper position.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Dental Implants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Dental implants are titanium posts surgically placed into the jawbone beneath the gums to replace missing tooth roots. Once in place, they allow your dentist to mount replacement teeth onto them.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Teeth Whitening</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Professional teeth whitening treatments use bleaching agents to remove stains and discoloration from teeth. In-office procedures provide immediate results, while take-home kits offer gradual whitening.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about dental health and care</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger>How often should I visit the dentist?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Most dental professionals recommend visiting the dentist every six months for routine checkups and cleanings. However, some people may need more frequent visits based on their oral health needs, such as those with gum disease, a high risk for cavities, or certain medical conditions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q2">
                    <AccordionTrigger>What causes bad breath?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Bad breath (halitosis) can be caused by various factors including poor oral hygiene, food particles trapped in teeth, dry mouth, tobacco use, certain medications, infections in the mouth, and underlying health conditions like respiratory infections, diabetes, or liver or kidney problems. Regular brushing, flossing, tongue cleaning, and dental visits can help prevent bad breath.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q3">
                    <AccordionTrigger>Is teeth whitening safe?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Professional teeth whitening performed by a dentist is generally safe. Over-the-counter products are also safe when used as directed. However, some people may experience temporary tooth sensitivity or gum irritation. It's best to consult with your dentist before beginning any whitening treatment, especially if you have dental restorations, sensitive teeth, or gum disease.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q4">
                    <AccordionTrigger>Why do my gums bleed when I brush?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Bleeding gums are often a sign of gingivitis, the early stage of gum disease caused by plaque buildup. Other causes include brushing too hard, improper flossing technique, vitamin deficiencies, certain medications, pregnancy hormones, and blood disorders. If bleeding persists despite improved oral hygiene, consult your dentist.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q5">
                    <AccordionTrigger>Are electric toothbrushes better than manual ones?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Electric toothbrushes can be more effective at removing plaque and reducing gingivitis compared to manual brushing. They're particularly helpful for people with limited dexterity, orthodontic appliances, or those who tend to brush too hard. However, proper technique with a manual toothbrush can also effectively maintain oral health. The best toothbrush is the one you will use consistently and correctly.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q6">
                    <AccordionTrigger>How can I prevent cavities?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Prevent cavities by brushing twice daily with fluoride toothpaste, flossing daily, using mouthwash, limiting sugary and acidic foods and drinks, avoiding frequent snacking, drinking plenty of water, considering dental sealants, getting regular dental checkups, and discussing fluoride treatments with your dentist.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
}
