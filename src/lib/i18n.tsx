import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isMarathi: boolean;
  t: (key: string, fallback?: string) => string;
  translate: (text: string) => string;
}

// 1. COMPREHENSIVE EXACT SENTENCES & HEADINGS DICTIONARY
export const EXACT_TRANSLATIONS: Record<string, string> = {
  // Brand & Taglines
  "Gramonnati": "ग्रामोन्नती",
  "RuralRise1": "ग्रामीण उन्नती १",
  "Rural Rise": "ग्रामीण उन्नती",
  "RuralRise": "ग्रामीण उन्नती",
  "RuralRise1 Unified Platform": "ग्रामीण उन्नती १ एकात्मिक व्यासपीठ",
  "Gramonnati • RuralRise1 Initiative": "ग्रामोन्नती • ग्रामीण उन्नती १ उपक्रम",
  "Gramonnati • Rural Rise Initiative": "ग्रामोन्नती • ग्रामीण उन्नती १ उपक्रम",
  "ग्रामीण उन्नती • Empowering Rural Bharat": "ग्रामीण उन्नती • समृद्ध ग्रामीण भारत",
  "AgriConnect Live Platform": "अ‍ॅग्रीकनेक्ट थेट व्यासपीठ",
  "AgriConnect Gramonnati": "अ‍ॅग्रीकनेक्ट ग्रामोन्नती",

  // Navigation
  "Home": "मुख्यपृष्ठ",
  "Marketplace": "कृषी बाजारपेठ",
  "Dashboard": "डॅशबोर्ड",
  "Sign In": "लॉगिन करा",
  "Register": "नोंदणी करा",
  "Logout": "बाहेर पडा",
  "Profile": "माझे प्रोफाइल",
  "All Mandis →": "सर्व बाजार समित्या →",
  "Live Mandi Stream:": "थेट बाजारभाव प्रवाह:",
  "Mandi:": "बाजार समिती:",

  // Roles
  "Farmer / Producer": "शेतकरी / उत्पादक",
  "Agricultural Laborer": "शेतमजूर",
  "APMC Market Admin": "बाजार समिती प्रशासक",
  "For Farm Owners": "शेतकऱ्यांसाठी",
  "For Skilled Laborers": "कुशल शेतमजुरांसाठी",
  "For Mandi Authorities": "बाजार समिती प्राधिकरणासाठी",
  "Farmer & Producer Portal": "शेतकरी व उत्पादक पोर्टल",
  "Agricultural Worker Hub": "शेतमजूर रोजगार केंद्र",
  "APMC Mandi Admin Desk": "बाजार समिती प्रशासन कक्ष",

  // Home Hero Section
  "Empowering Farmers.": "शेतकऱ्यांना सक्षम करणे.",
  "Connecting Labor & Mandis.": "शेतमजूर आणि बाजार समित्यांना जोडणे.",
  "Empowering Farmers. Connecting Labor & Mandis.": "शेतकऱ्यांना सक्षम करणे. शेतमजूर आणि बाजार समित्यांना जोडणे.",
  "Gramonnati bridges rural farm owners with skilled agricultural labor through GPS navigation, direct crop selling (Wheat, Bajra, Jowar), and transparent APMC mandi pricing with zero middleman fees.": "ग्रामोन्नती हे ग्रामीण शेतकरी आणि कुशल शेतमजुरांना जीपीएस नेव्हिगेशन, थेट शेतीमाल विक्री (गहू, बाजरी, ज्वारी) आणि मध्यस्थांशिवाय पारदर्शक बाजार समिती दरांसह थेट जोडते.",
  "Get Started / Instant Login": "सुरुवात करा / थेट लॉगिन",
  "Buy Farm Produce": "शेतीमाल खरेदी करा",
  "GPS Labor Dispatch": "जीपीएस शेतमजूर शोध",
  "Daily Wages ₹600 - ₹950": "दैनिक मजुरी ₹६०० - ₹९५०",
  "Grade A+ Grains": "दर्जा अ+ शेतीमाल",

  // Telemetry HUD Card
  "Telemetry Sensor Active": "सक्रिय सेन्सर निरीक्षण",
  "Nashik Rural Agri Belt": "नाशिक ग्रामीण कृषी पट्टा",
  "78% Optimal": "७८% अनुकूल",
  "Moisture": "ओलावा",
  "Weather": "हवामान",
  "Labor Jobs": "शेती कामे",
  "14 Active": "१४ उपलब्ध",
  "27°C Sunny": "२७°से ऊन",

  // 3-Role Ecosystem Section
  "Complete Ecosystem": "संपूर्ण कृषी परिसंस्था",
  "Tailored Hub for Every Agricultural Partner": "प्रत्येक कृषी घटकासाठी विशेष केंद्र",
  "Select your role to access specialized area-wise tools, job postings, GPS routing, or mandi admin analytics.": "क्षेत्रनिहाय साधने, कामे पोस्ट करणे, जीपीएस मार्ग किंवा बाजार समिती प्रशासनासाठी आपली भूमिका निवडा.",
  "Post harvest jobs area-wise, manage applicant profiles, list grains (Wheat, Bajra, Jowar) for direct sale, and monitor sensor telemetry.": "कापणी व शेती कामे पोस्ट करा, अर्जांचे व्यवस्थापन करा, थेट विक्रीसाठी शेतीमाल नोंदवा आणि थेट हवामान पहा.",
  "Area-wise Job Posting System": "क्षेत्रनिहाय काम पोस्टिंग प्रणाली",
  "Harvest Produce Selling Dashboard": "शेतीमाल थेट विक्री डॅशबोर्ड",
  "Crop Health Doctor & Diagnostics": "पीक आरोग्य सल्ला व निदान",
  "Enter Farmer Dashboard": "शेतकरी डॅशबोर्ड उघडा",
  "Find jobs by daily wages (₹500 - ₹950/day), calculate travel distance, get turn-by-turn GPS directions with Google Maps, and track earnings.": "दैनिक मजुरीनुसार (₹५०० - ₹९५०/दिवस) कामे शोधा, अंतर मोजा, गुगल मॅप्सने थेट शेतापर्यंत जीपीएस मार्ग मिळवा आणि कमाई पहा.",
  "Turn-by-Turn GPS Directions": "थेट शेतापर्यंत जीपीएस दिशादर्शन",
  "1-Click Job Application & Tracking": "एका क्लिकवर कामाचा अर्ज व ट्रॅकिंग",
  "Download Worker Skill Dossier": "मजूर कौशल्य ओळखपत्र डाउनलोड करा",
  "Find Jobs & GPS Routes": "कामे व जीपीएस मार्ग शोधा",
  "Oversee regional commodity volume, publish MSP benchmarks, review area-wise laborer employment rates, and verify transactions.": "प्रादेशिक आवक पहा, हमीभाव जाहीर करा, भागातील शेतमजूर रोजगार दर तपासा आणि व्यवहारांची पडताळणी करा.",
  "State Agri Marketing Statistics": "राज्य कृषी पणन आकडेवारी",
  "Multi-District APMC Benchmarks": "विविध जिल्ह्यांतील बाजारभाव निर्देशांक",
  "Verified Produce Verification": "प्रमाणित शेतीमाल तपासणी",
  "Access Admin Analytics": "प्रशासक विश्लेषण पहा",

  // Featured Harvest Produce Section
  "Direct From Farmers": "थेट शेतकऱ्यांकडून",
  "Featured Harvest Produce": "खास शेतीमाल व उत्पादने",
  "Certified grains, pearl millets, and pulses ready for farm-gate dispatch or mandi delivery.": "शेतकऱ्यांच्या शेतातून किंवा बाजार समितीत थेट वितरणासाठी तयार प्रमाणित धान्य व कडधान्ये.",
  "View Full Marketplace": "संपूर्ण कृषी बाजारपेठ पहा",
  "Farm Gate Rate": "शेतकरी थेट दर",
  "Buy / Order Now": "खरेदी करा / ऑर्डर करा",
  "Bestseller": "सर्वाधिक पसंती",
  "Mandi Verified": "बाजार समिती प्रमाणित",
  "GI Special": "जीआय मानांकन",
  "High Demand": "उच्च मागणी",
  "Grade A+ Organic": "दर्जा अ+ सेंद्रिय",
  "High-Iron Nutri": "लोहयुक्त पौष्टिक",
  "GI Tagged Heritage": "जीआय मानांकित पारंपारिक",
  "JS-335 Certified": "जेएस-३३५ प्रमाणित",

  // Interactive District Telemetry Section
  "Precision Agriculture": "अचूक व आधुनिक शेती",
  "Real-Time Regional Soil & Mandi Telemetry": "थेट प्रादेशिक माती व बाजारभाव माहिती",
  "Connect your farm micro-climate with district-level mandi statistics. Switch districts to see live atmospheric readings and top commodities.": "आपल्या शेतातील हवामान आणि जिल्हास्तरीय बाजारभाव एकत्र पहा. थेट नोंदी पाहण्यासाठी जिल्हा बदला.",
  "District": "जिल्हा",
  "Nashik District": "नाशिक जिल्हा",
  "Pune District": "पुणे जिल्हा",
  "Baramati District": "बारामती जिल्हा",
  "Latur District": "लातूर जिल्हा",
  "Active Monitoring Station": "सक्रिय निरीक्षण केंद्र",
  "Nashik Agro-Climatic Zone": "नाशिक कृषी-हवामान क्षेत्र",
  "Pune Agro-Climatic Zone": "पुणे कृषी-हवामान क्षेत्र",
  "Baramati Agro-Climatic Zone": "बारामती कृषी-हवामान क्षेत्र",
  "Latur Agro-Climatic Zone": "लातूर कृषी-हवामान क्षेत्र",
  "Live Sensors Connected": "थेट सेन्सर्स जोडलेले आहेत",
  "Air Temp": "हवेचे तापमान",
  "Soil Moisture": "मातीतील ओलावा",
  "Mandi Inflow": "बाजार आवक",
  "Humidity": "हवेतील आर्द्रता",
  "Key District Crop": "जिल्ह्यातील मुख्य पीक",
  "View Market Trends": "बाजारभाव कल पहा",

  // Bottom CTA Banner
  "Join Gramonnati RuralRise1": "ग्रामोन्नती ग्रामीण उन्नती १ मध्ये सामील व्हा",
  "Join Gramonnati Rural Rise": "ग्रामोन्नती ग्रामीण उन्नती १ मध्ये सामील व्हा",
  "Ready to modernize your farm and expand your reach?": "आपली शेती आधुनिक करण्यासाठी आणि बाजारपेठ वाढवण्यासाठी तयार आहात का?",
  "Create your profile today as a Farmer, Laborer, or Trader to unlock GPS job routing, direct crop sales, and live mandi intelligence.": "जीपीएस शेती कामे, थेट शेतीमाल विक्री आणि थेट बाजारभावासाठी शेतकरी, मजूर किंवा व्यापारी म्हणून आजच प्रोफाइल तयार करा.",
  "Get Started Now": "आता सुरुवात करा",

  // Marketplace Page
  "Direct Farm-to-Buyer Marketplace": "थेट शेतकरी ते खरेदीदार कृषी बाजारपेठ",
  "Directly sourced agricultural grains, millets, and pulses from verified farmers with transparent APMC pricing benchmarks.": "प्रमाणित शेतकऱ्यांकडून थेट धान्य, बाजरी, ज्वारी, डाळी - पारदर्शक बाजारभाव व खात्रीशीर दर्जा.",
  "Gramonnati Market Advisory": "ग्रामोन्नती बाजारभाव व विक्री सल्ला",
  "Real-time APMC Feed": "थेट बाजार समिती अपडेट",
  "Market Timing & Pricing Advice": "बाजार वेळ व विक्री सल्ला",
  "Top Rising Crop:": "सर्वाधिक वाढणारे पीक:",
  "MSP Support Status:": "हमीभाव आधार स्थिती:",
  "Active across 18 Mandis": "१८ बाजार समित्यांमध्ये सक्रिय",
  "Refresh Market Forecast": "बाजार सल्ला ताजे करा",
  "APMC Benchmark Price Trends (₹/kg)": "बाजार समिती संदर्भ दर कल (₹/किलो)",
  "Historical mandi movements for Wheat, Bajra, Jowar, and Soy": "गहू, बाजरी, ज्वारी आणि सोयाबीनचे ऐतिहासिक बाजारभाव बदल",
  "Search by crop, variety, or farmer...": "पीक, जात किंवा शेतकऱ्याच्या नावाने शोधा...",
  "Filter by Category": "प्रकारानुसार निवडा",
  "All": "सर्व",
  "Cereals": "धान्य",
  "Millets": "तृणधान्य (बाजरी/ज्वारी)",
  "Pulses": "कडधान्ये व डाळी",
  "Oilseeds": "तेलबिया",
  "Cash Crops": "नगदी पिके",
  "Commercial": "व्यापारी पिके",
  "List Farm Produce": "+ शेतीमाल नोंदवा",
  "+ List Farm Produce": "+ शेतीमाल नोंदवा",
  "Price per Kg": "दर प्रति किलो",
  "Price per Quintal": "दर प्रति क्विंटल",
  "Available Quantity": "उपलब्ध प्रमाण",
  "Min Order": "किमान ऑर्डर",
  "Harvest Date": "काढणी दिनांक",
  "Mandi Benchmark Rate": "बाजार समिती संदर्भ दर",
  "Order Now": "खरेदी करा",
  "Contact Farmer": "शेतकऱ्यांशी संपर्क साधा",
  "Call Farmer": "फोन करा",
  "WhatsApp": "व्हॉट्सअ‍ॅप",
  "Select Delivery Method": "वितरण पद्धत निवडा",
  "Farm Gate Pickup": "शेतावर जाऊन उचलणे",
  "APMC Mandi Yard Delivery": "बाजार समिती यार्डात डिलिव्हरी",
  "Confirm Order": "ऑर्डर निश्चित करा",
  "Order Placed Successfully!": "ऑर्डर यशस्वीरित्या नोंदवली गेली!",
  "Direct Farmer Purchase Receipt": "थेट शेतकरी खरेदी पावती",

  // Dashboard Page & Tabs
  "Welcome back": "पुन्हा स्वागत आहे",
  "Verified Account": "प्रमाणित खाते",
  "Farmer & Harvest Management Portal": "शेतकरी व पीक व्यवस्थापन पोर्टल",
  "Agricultural Laborer Job Center": "शेतमजूर रोजगार केंद्र",
  "APMC Market State Administration": "बाजार समिती राज्य प्रशासन",
  "Complete Profile": "प्रोफाइल पूर्ण करा",
  "Download Agrarian ID Card": "ओळखपत्र डाउनलोड करा",
  "Available Jobs": "उपलब्ध शेती कामे",
  "Post Jobs & Workforce": "काम पोस्ट करा व मजूर शोधा",
  "Farm Locations & GPS": "शेती स्थान व जीपीएस नेव्हिगेशन",
  "Produce & Mandi Rates": "शेतीमाल व बाजारभाव",
  "Product Listing & Sales": "उत्पादन यादी व थेट विक्री",
  "My Work & Wages": "माझी कामे व मजुरी",
  "Harvest Yields & Demand": "पीक उत्पादन व मागणी",
  "Weather & Farm Planning": "हवामान अंदाज व कृषी सल्ला",
  "APMC State Oversight": "बाजार समिती राज्य प्रशासन",
  "Filter by Area": "भागांनुसार निवडा",
  "Apply for Work": "कामासाठी अर्ज करा",
  "View Directions": "नकाशा व दिशा पहा",
  "Applied": "अर्ज केला आहे",
  "Application Pending": "अर्ज प्रलंबित",
  "Job Accepted": "काम मंजूर झाले",
  "Daily Wage": "दैनिक मजुरी",
  "Working Hours": "कामाची वेळ",
  "Distance": "अंतर",
  "Location": "स्थान",
  "Post New Farm Job": "+ नवीन शेती काम पोस्ट करा",
  "+ Post New Farm Job": "+ नवीन शेती काम पोस्ट करा",
  "Job Title": "कामाचे नाव",
  "Job Category": "कामाचा प्रकार",
  "Wage per Day (₹)": "दैनिक मजुरी (₹)",
  "Work Area / District": "कामाचा भाग / जिल्हा",
  "Detailed Requirements": "कामाचा तपशील",
  "Post Job Now": "काम पोस्ट करा",
  "AgriConnect Agricultural Advisory": "अ‍ॅग्रीकनेक्ट कृषी नियोजन सल्ला",
  "Live Expert System": "तज्ज्ञ शेती सल्लागार",
  "Atmospheric Weather": "थेट हवामान स्थिती",
  "Open Agro Advisory": "कृषी सल्ला उघडा",
  "Active Field Jobs": "सक्रिय शेती कामे",
  "Verified Agricultural Workers": "प्रमाणित शेतमजूर",
  "Farm Produce Listed": "नोंदणीकृत शेतीमाल",
  "APMC Mandi Benchmark Index": "बाजार समिती निर्देशांक",
  "Download Dossier": "दस्तावेज डाउनलोड करा",
  "Download Official Agrarian ID Dossier": "अधिकृत शेतकरी/मजूर ओळखपत्र डाउनलोड करा",
  "Verified APMC Agrarian Credentials": "प्रमाणित बाजार समिती कृषी ओळख",
  "Digital Verification QR & Barcode": "डिजिटल पडताळणी क्यूआर कोड",
  "Certified Agricultural Identity": "प्रमाणित कृषी ओळखपत्र",

  // Agricultural Laborer Produce Purchase & Concession
  "Buy Farm Produce (Worker Rates)": "शेतीमाल खरेदी (कामगार दर)",
  "Worker Rates": "कामगार सवलत दर",
  "Worker Grain Concession": "कामगार धान्य सवलत",
  "Special Farm-Gate Rates for Agricultural Workers": "शेतमजुरांसाठी विशेष थेट शेतावरील सवलत दर",
  "Worker Concession Price": "कामगार सवलत दर",
  "Laborer Concession Price:": "कामगार सवलत दर:",
  "Worker Savings:": "कामगार बचत:",
  "Total Worker Savings": "एकूण कामगार बचत",
  "Laborer Direct Farm Gate Purchase": "शेतमजूर थेट शेतीमाल खरेदी",
  "Pickup Verification Code": "पिकअप पडताळणी कोड",
  "Pickup Landmark:": "पिकअप खूण / लँडमार्क:",
  "Pickup Landmark": "पिकअप खूण / लँडमार्क",
  "Farm Pickup Location & Landmark Details": "शेतावरील पिकअप स्थान व लँडमार्क तपशील",
  "Exact Farm-Gate Landmark (Crucial for Laborers & Truck Drivers)": "शेताचे नेमके प्रवेशद्वार / लँडमार्क (मजूर व चालकांसाठी)",
  "Enable Worker / Laborer Concession Price": "शेतमजूर व कामगार सवलत दर सुरू करा",
  "Worker Rate (₹/kg)": "कामगार दर (₹/किलो)",
  "Worker Min Order (Kg)": "किमान खरेदी प्रमाण (किलो)",
  "Capture Farm GPS": "शेताचे जीपीएस मिळवा",
  "Detecting GPS...": "जीपीएस शोधत आहे...",
  "Cash on Pickup": "पिकअपवेळी रोख रक्कम",
  "Wage Offset": "मजुरीतून वजावट",
  "Wage Settlement Offset": "मजुरीतून वजावट",
  "Direct UPI": "थेट यूपीआय",
  "Farm-Gate Self Pickup": "थेट शेतावर स्वतः पिकअप",
  "Village Depot Drop": "गाव केंद्र / डेपो डिलिव्हरी",
  "Directions to Farm": "शेताचा रस्ता / दिशा",
  "Print Slip": "पावती प्रिंट करा",
  "Produce Order Confirmed!": "शेतीमाल ऑर्डर पुष्टी झाली!",
  "Confirm Order & Get Pickup Code": "ऑर्डर निश्चित करा व पिकअप कोड मिळवा",
  "Browse Produce Now": "शेतीमाल पहा व खरेदी करा",

  // Weather Component
  "Real-Time Farm Weather & Agro Advisory": "थेट शेती हवामान व कृषी नियोजन सल्ला",
  "Live meteorological observations & crop action advisory for your region": "आपल्या भागासाठी थेट हवामान निरीक्षणे व पीक नियोजन मार्गदर्शन",
  "Detect My Farm GPS": "माझ्या शेताचे जीपीएस शोधा",
  "Locating...": "स्थान शोधत आहे...",
  "Select Agricultural District": "कृषी जिल्हा निवडा",
  "Refresh Weather": "हवामान अपडेट करा",
  "Temperature": "तापमान",
  "Feels like": "जाणवणारे तापमान",
  "Relative Humidity": "हवेतील आर्द्रता",
  "Wind Speed": "वाऱ्याचा वेग",
  "Rain Probability": "पावसाची शक्यता",
  "Expected Rainfall": "अपेक्षित पाऊस",
  "UV Radiation Index": "अल्ट्राव्हायोलेट किरण निर्देशांक",
  "Soil Evaporation Status": "मातीतील ओलावा स्थिती",
  "7-Day Agrarian Weather Outlook": "७ दिवसांचा कृषी हवामान अंदाज",
  "Agricultural Field Action Advisories": "महत्त्वाचे शेती नियोजन सल्ले",
  "Spraying Advisory": "कीटकनाशक / खत फवारणी सल्ला",
  "Spraying Caution: Moderate wind or humidity may cause chemical drift.": "फवारणी सावधगिरी: मध्यम वारा किंवा आर्द्रतेमुळे औषध वाहून जाण्याची शक्यता आहे.",
  "Optimal for spraying: Low wind speed and no imminent rain risk.": "फवारणीसाठी अनुकूल: वाऱ्याचा वेग नियंत्रित असून पावसाचा धोका नाही.",
  "Postpone Spraying: High wind or impending precipitation risk wash-off.": "फवारणी पुढे ढकला: जोरदार वारा अथवा पावसामुळे फवारणी वाहून जाण्याची शक्यता आहे.",
  "Irrigation & Pumping Schedule": "सिंचन व पाणी नियोजन",
  "Rain expected: Postpone deep irrigation to conserve groundwater and power.": "पाऊस अपेक्षित आहे: विहीर/बोअरवेलचे पाणी व वीज वाचवण्यासाठी सिंचन पुढे ढकला.",
  "Dry conditions: Maintain regular drip/sprinkler schedule for active standing crops.": "कोरडे हवामान: उभ्या पिकांसाठी ठिबक किंवा तुषार सिंचन नियमित सुरू ठेवा.",
  "Harvesting & Grain Drying": "कापणी व धान्य सुकवणे सल्ला",
  "Dry sunny day: Favorable for crop harvesting, threshing, and sun drying.": "उघडीप व सूर्यप्रकाश: पीक काढणी, मळणी आणि धान्य वाळवण्यासाठी उत्तम परिस्थिती.",
  "High moisture alert: Protect harvested grain in tarpaulin covers against dampness.": "दमट हवामान इशारा: काढलेला शेतीमाल ताडपत्रीखाली सुरक्षित झाकून ठेवा.",
  "Field Labor & Shift Schedule": "शेतमजूर व कामाची वेळ सल्ला",
  "High heat: Schedule field labor in early morning (6:30 AM - 11 AM) and late afternoon.": "तीव्र ऊन: शेतमजुरांचे काम सकाळी (६:३० ते ११) व दुपारी ३ नंतर आयोजित करा.",
  "Pleasant temperature: Safe and productive working environment throughout the day.": "अनुकूल तापमान: दिवसभर शेतातील कामांसाठी वातावरण उत्तम व सुरक्षित आहे.",

  // Weather States
  "Clear Skies": "निरभ्र आकाश",
  "Mainly Sunny": "सूर्यप्रकाश व अंशतः ढगाळ",
  "Partly Cloudy": "अंशतः ढगाळ",
  "Overcast Clouds": "संपूर्ण ढगाळ",
  "Morning Fog / Mist": "धुके / दव",
  "Light Drizzle": "हलक्या सरी",
  "Rain Showers": "पाऊस",
  "Heavy Downpour": "मुसळधार पाऊस",
  "Thunderstorm & Gusts": "वादळी वाऱ्यासह पाऊस",

  // Login / Register Page
  "Sign in to your agrarian account": "आपल्या कृषी खात्यात लॉगिन करा",
  "Create a new verified agrarian account": "नवीन प्रमाणित कृषी खाते तयार करा",
  "Email Address": "ईमेल पत्ता",
  "Password": "पासवर्ड",
  "Full Name": "पूर्ण नाव",
  "Sign In to Dashboard": "डॅशबोर्डमध्ये प्रवेश करा",
  "Complete Registration": "नोंदणी पूर्ण करा",
  "Don't have an account?": "खाते नाही का?",
  "Already registered?": "आधीच नोंदणी झाली आहे का?",
  "Quick Demo Profiles:": "डेमो प्रोफाइल्स:",
  "Demo Profiles (Instant Demo Login)": "डेमो प्रोफाइल्स (झटपट डेमो लॉगिन)",
  "Instant Role Logins (1-Click Evaluation)": "डेमो प्रोफाइल्स (झटपट डेमो लॉगिन)",
  "Demo Accounts (Instant Demo Login)": "डेमो खाती (झटपट डेमो लॉगिन)",
  "Demo Farmer": "डेमो शेतकरी",
  "Demo Laborer": "डेमो शेतमजूर",
  "Demo Admin": "डेमो प्रशासक",
  "Select Your Role": "आपली भूमिका निवडा",
  "Remember this account": "हे खाते लक्षात ठेवा",

  // Profile Page
  "Agrarian Profile": "कृषी प्रोफाइल",
  "Personal Information": "वैयक्तिक माहिती",
  "Phone Number": "फोन नंबर",
  "Village / Location": "गाव / ठिकाण",
  "Taluka": "तालुका",
  "Farm Details": "शेतीचा तपशील",
  "Total Farm Size (Acres)": "एकूण शेतजमीन (एकर)",
  "Crops Grown": "घेतली जाणारी पिके",
  "Irrigation Type": "सिंचन पद्धत",
  "Worker Skills & Equipment": "मजूर कौशल्ये व अवजारे",
  "Years of Experience": "अनुभव (वर्षे)",
  "Expected Daily Wage (₹)": "अपेक्षित दैनिक मजुरी (₹)",
  "Save Profile": "प्रोफाइल जतन करा",
  "Saving...": "जतन करत आहे...",
  "Detect Location via GPS": "जीपीएसने स्थान शोधा",
  "Save Changes": "बदल जतन करा",
  "Cancel": "रद्द करा",
  "Close": "बंद करा",
  "Back": "मागे",
  "Next": "पुढे",
  "Finish": "पूर्ण करा",
};

// 2. PHRASES & PRODUCE NAMES (Sorted longest to shortest so compound phrases match first)
export const PHRASE_DICTIONARY: [RegExp, string][] = [
  // Products & Grains
  [/Certified Sharbati Gold Wheat \(Grade A\+\)/gi, "प्रमाणित शरबती गोल्ड गहू (दर्जा अ+)"],
  [/Certified Sharbati Gold Wheat/gi, "प्रमाणित शरबती गोल्ड गहू"],
  [/Sharbati Gold Wheat/gi, "शरबती गोल्ड गहू"],
  [/Lokwan Milling Wheat/gi, "लोकवान गहू"],
  [/Desi Hybrid Bajra \(Pearl Millet\)/gi, "देशी हायब्रिड बाजरी"],
  [/Desi Hybrid Bajra/gi, "देशी हायब्रिड बाजरी"],
  [/Maldandi Jowar \(White Sorghum\)/gi, "मालदांडी शाळू ज्वारी"],
  [/Maldandi M-35 Jowar/gi, "मालदांडी एम-३५ ज्वारी"],
  [/Maldandi Jowar/gi, "मालदांडी ज्वारी"],
  [/White Sorghum \(Jowar\)/gi, "पांढरी ज्वारी (शाळू)"],
  [/White Sorghum/gi, "पांढरी ज्वारी"],
  [/High-Protein Yellow Soybean \(JS-335\)/gi, "उच्च-प्रथिनयुक्त पिवळा सोयाबीन (जेएस-३३५)"],
  [/High-Protein Yellow Soybean/gi, "उच्च-प्रथिनयुक्त पिवळा सोयाबीन"],
  [/Yellow Soybean \(JS-335\)/gi, "पिवळा सोयाबीन (जेएस-३३५)"],
  [/Yellow Soybean/gi, "पिवळा सोयाबीन"],
  [/Marathwada Toor Dal/gi, "मराठवाडा तूर डाळ"],
  [/Desi Chana \(Bengal Gram\)/gi, "देशी हरभरा (चना)"],
  [/Green Moong Whole/gi, "अख्खा हिरवा मूग"],
  [/Black Urad Dal/gi, "काळी उडीद डाळ"],
  [/Yellow Hybrid Maize/gi, "पिवळा हायब्रिड मका"],
  [/1121 Basmati Paddy/gi, "११२१ बासमती धान"],
  [/Wada Kolam Rice/gi, "वाडा कोलम तांदूळ"],
  [/Black Mustard Seed \(Rai\)/gi, "काळी मोहरी (राई)"],
  [/Oilseed Groundnut/gi, "भुईमूग शेंगदाणे"],
  [/Sunflower Oilseeds/gi, "सूर्यफूल तेलबिया"],
  [/Organic BT Cotton \(Kapas\)/gi, "सेंद्रिय बीटी कापूस"],
  [/Nashik Red Onion/gi, "नाशिक लाल कांदा"],
  [/Kolhapur Desi Gur \(Jaggery\)/gi, "कोल्हापूर सेंद्रिय गूळ"],
  [/Salem Polished Turmeric/gi, "सालेम पॉलिश हळद"],
  [/Long-Staple Raw Cotton Bales/gi, "लांब धाग्याचा सेंद्रिय कापूस"],

  // Agricultural activities & Categories
  [/Tractor Driving & Rotavator/gi, "ट्रॅक्टर चालवणे व रोटाव्हेटर"],
  [/Tractor Driving/gi, "ट्रॅक्टर चालवणे"],
  [/Wheat Harvesting/gi, "गहू काढणी व कापणी"],
  [/Bajra \/ Jowar Harvesting/gi, "बाजरी / ज्वारी काढणी"],
  [/Precision Spraying/gi, "अचूक कीटकनाशक फवारणी"],
  [/Drip Irrigation Setup/gi, "ठिबक सिंचन जोडणी व देखभाल"],
  [/Transplanting & Sowing/gi, "पेरणी व लावण"],
  [/Fruit & Grape Picking/gi, "फळ व द्राक्ष तोडणी"],
  [/Dairy & Cattle Care/gi, "दुग्धव्यवसाय व पशुपालन"],
  [/Loading & Agro Transport/gi, "शेतीमाल लोडिंग व वाहतूक"],

  // Job Categories
  [/\bHarvesting\b/gi, "कापणी / काढणी"],
  [/\bMachinery\b/gi, "यंत्रकाम / ट्रॅक्टर"],
  [/\bSowing\b/gi, "पेरणी / लावण"],
  [/\bIrrigation\b/gi, "सिंचन / पाणी"],
  [/\bSpraying\b/gi, "फवारणी"],

  // Mandis & Regions
  [/Niphad, Nashik/gi, "निफाड, नाशिक"],
  [/Baramati, Pune/gi, "बारामती, पुणे"],
  [/Latur Agro Yard/gi, "लातूर कृषी यार्ड"],
  [/Solapur \/ Marathwada/gi, "सोलापूर / मराठवाडा"],
  [/Lasalgaon/gi, "लासलगाव"],
  [/Gondia/gi, "गोंदिया"],
  [/Palghar/gi, "पालघर"],
  [/Kolhapur/gi, "कोल्हापूर"],
  [/Yavatmal/gi, "यवतमाळ"],
  [/Amravati/gi, "अमरावती"],
  [/Jalgaon/gi, "जळगाव"],
  [/Sangli/gi, "सांगली"],
  [/Satara/gi, "सातारा"],
  [/Ahmednagar/gi, "अहमदनगर"],
  [/Nagpur/gi, "नागपूर"],
  [/Nanded/gi, "नांदेड"],
  [/Jalna/gi, "जालना"],
  [/Akola/gi, "अकोला"],
  [/Dhule/gi, "धुळे"],
  [/Beed/gi, "बीड"],

  // UI labels & phrases
  [/Live Mandi Stream/gi, "थेट बाजारभाव"],
  [/Agro-Climatic Zone/gi, "कृषी-हवामान क्षेत्र"],
  [/Active Monitoring Station/gi, "सक्रिय निरीक्षण केंद्र"],
  [/Farm Gate Rate/gi, "शेतकरी थेट दर"],
  [/Mandi Benchmark/gi, "बाजार समिती दर"],
  [/Daily Wage[s]?/gi, "दैनिक मजुरी"],
  [/Working Hours/gi, "कामाची वेळ"],
  [/Available Quantity/gi, "उपलब्ध प्रमाण"],
  [/Quantity Available/gi, "उपलब्ध प्रमाण"],
  [/Price per Kg/gi, "दर प्रति किलो"],
  [/Price per Quintal/gi, "दर प्रति क्विंटल"],
  [/Soil Moisture/gi, "मातीतील ओलावा"],
  [/Relative Humidity/gi, "हवेतील आर्द्रता"],
  [/Air Temp/gi, "हवेचे तापमान"],
  [/Mandi Inflow/gi, "बाजार आवक"],
  [/Key District Crop/gi, "जिल्ह्यातील मुख्य पीक"],
  [/View Market Trends/gi, "बाजारभाव कल पहा"],
  [/Order Now/gi, "खरेदी करा"],
  [/Buy \/ Order Now/gi, "खरेदी करा / ऑर्डर करा"],
  [/Contact Farmer/gi, "शेतकऱ्यांशी संपर्क साधा"],
  [/Apply for Work/gi, "कामासाठी अर्ज करा"],
  [/View Directions/gi, "नकाशा व दिशा पहा"],
  [/Download Agrarian ID Card/gi, "ओळखपत्र डाउनलोड करा"],
  [/Complete Profile/gi, "प्रोफाइल पूर्ण करा"],
  [/Post New Farm Job/gi, "नवीन शेती काम पोस्ट करा"],
  [/List Farm Produce/gi, "शेतीमाल नोंदवा"],
  [/Save Changes/gi, "बदल जतन करा"],
  [/Detect My Farm GPS/gi, "शेताचे जीपीएस शोधा"],
  [/Refresh Weather/gi, "हवामान अपडेट करा"],
  [/Refresh Market Forecast/gi, "बाजार सल्ला ताजे करा"],
  [/Live Expert System/gi, "तज्ज्ञ शेती सल्लागार"],
  [/Atmospheric Weather/gi, "थेट हवामान स्थिती"],
  [/Open Agro Advisory/gi, "कृषी सल्ला उघडा"],
  [/Verified Account/gi, "प्रमाणित खाते"],
  [/Welcome back/gi, "पुन्हा स्वागत आहे"],
  [/Sign in to your agrarian account/gi, "आपल्या कृषी खात्यात लॉगिन करा"],
  [/Create a new verified agrarian account/gi, "नवीन प्रमाणित कृषी खाते तयार करा"],
  [/Sign In to Dashboard/gi, "डॅशबोर्डमध्ये प्रवेश करा"],
  [/Complete Registration/gi, "नोंदणी पूर्ण करा"],
  [/Quick Demo Profiles:/gi, "डेमो प्रोफाइल्स:"],
  [/Demo Profiles \(Instant Demo Login\)/gi, "डेमो प्रोफाइल्स (झटपट डेमो लॉगिन)"],
  [/Instant Role Logins \(1-Click Evaluation\)/gi, "डेमो प्रोफाइल्स (झटपट डेमो लॉगिन)"],
  [/Demo Accounts/gi, "डेमो खाती"],
  [/Demo Farmer/gi, "डेमो शेतकरी"],
  [/Demo Laborer/gi, "डेमो शेतमजूर"],
  [/Demo Admin/gi, "डेमो प्रशासक"],
  [/RuralRise1/gi, "ग्रामीण उन्नती १"],
  [/Rural Rise 1/gi, "ग्रामीण उन्नती १"],
  [/Rural Rise/gi, "ग्रामीण उन्नती"],
  [/Don't have an account\?/gi, "खाते नाही का?"],
  [/Already registered\?/gi, "आधीच नोंदणी झाली आहे का?"],
  [/Remember this account/gi, "हे खाते लक्षात ठेवा"],

  // Common crop single words
  [/\bWheat\b/g, "गहू"],
  [/\bBajra\b/g, "बाजरी"],
  [/\bJowar\b/g, "ज्वारी"],
  [/\bSoybean\b/g, "सोयाबीन"],
  [/\bCotton\b/g, "कापूस"],
  [/\bOnion\b/g, "कांदा"],
  [/\bTurmeric\b/g, "हळद"],
  [/\bSugarcane\b/g, "ऊस"],
  [/\bGrapes\b/g, "द्राक्षे"],
  [/\bChana\b/g, "हरभरा"],
  [/\bMoong\b/g, "मूग"],
  [/\bUrad\b/g, "उडीद"],
  [/\bPaddy\b/g, "भात (धान)"],
  [/\bMustard\b/g, "मोहरी"],
  [/\bGroundnut\b/g, "भुईमूग"],
  [/\bSunflower\b/g, "सूर्यफूल"],
  [/\bJaggery\b/g, "गूळ"],
  [/\bMaize\b/g, "मका"],
  [/\bToor Dal\b/g, "तूर डाळ"],
  [/\bToor\b/g, "तूर"],

  // Units & statuses
  [/\bActive\b/g, "सक्रिय"],
  [/\bPending\b/g, "प्रलंबित"],
  [/\bConfirmed\b/g, "निश्चित"],
  [/\bAvailable\b/g, "उपलब्ध"],
  [/\bCompleted\b/g, "पूर्ण"],
  [/\bSold Out\b/g, "विक्री झाली"],
  [/\bOptimal\b/g, "अनुकूल"],
  [/\bSunny\b/g, "सूर्यप्रकाश"],
  [/\bRain\b/g, "पाऊस"],
  [/\bCloudy\b/g, "ढगाळ"],
  [/\bDistrict\b/g, "जिल्हा"],
  [/\bAcres\b/g, "एकर"],
  [/\bAcre\b/g, "एकर"],
  [/\bQtl\b/g, "क्विंटल"],
  [/\bQuintal\b/g, "क्विंटल"],
  [/\bkg\b/g, "किलो"],
  [/\bhours?\b/gi, "तास"],
  [/\bdays?\b/gi, "दिवस"],
  [/\bper day\b/gi, "प्रति दिवस"],
  [/\bper kg\b/gi, "प्रति किलो"],
  [/\bper Quintal\b/gi, "प्रति क्विंटल"],
];

/**
 * Robust string translator that matches exact full sentences first,
 * then checks known phrase replacements, and preserves whitespaces.
 */
export function translateSentenceOrPhrase(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return raw;

  // 1. Direct exact dictionary match
  if (EXACT_TRANSLATIONS[trimmed]) {
    return EXACT_TRANSLATIONS[trimmed];
  }

  // 2. Case-insensitive exact match
  const lowerTrimmed = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(EXACT_TRANSLATIONS)) {
    if (key.toLowerCase() === lowerTrimmed) {
      return val;
    }
  }

  // 3. Multi-word phrase regex replacements
  let translated = trimmed;
  let changed = false;

  for (const [regex, replacement] of PHRASE_DICTIONARY) {
    if (regex.test(translated)) {
      translated = translated.replace(regex, replacement);
      changed = true;
    }
  }

  return changed ? translated : trimmed;
}

export function translateStringWithWhitespace(raw: string): string {
  if (!raw || !/[a-zA-Z]/.test(raw)) return raw;
  const match = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match) return raw;
  const [, leading, content, trailing] = match;
  if (!content) return raw;
  const translated = translateSentenceOrPhrase(content);
  return leading + translated + trailing;
}

// Structured UI key translations for t(key, fallback)
const translations: Record<string, { en: string; mr: string }> = {
  // Navigation
  'nav.home': { en: 'Home', mr: 'मुख्यपृष्ठ' },
  'nav.marketplace': { en: 'Marketplace', mr: 'कृषी बाजारपेठ' },
  'nav.dashboard': { en: 'Dashboard', mr: 'डॅशबोर्ड' },
  'nav.signIn': { en: 'Sign In', mr: 'लॉगिन करा' },
  'nav.register': { en: 'Register', mr: 'नोंदणी करा' },
  'nav.logout': { en: 'Logout', mr: 'बाहेर पडा' },
  'nav.profile': { en: 'Profile', mr: 'माझे प्रोफाइल' },

  // Roles
  'role.farmer': { en: 'Farmer / Producer', mr: 'शेतकरी / उत्पादक' },
  'role.laborer': { en: 'Agricultural Laborer', mr: 'शेतमजूर' },
  'role.admin': { en: 'APMC Market Admin', mr: 'बाजार समिती प्रशासक' },

  // Dashboard general
  'dash.welcome': { en: 'Welcome back', mr: 'पुन्हा स्वागत आहे' },
  'dash.verified': { en: 'Verified Account', mr: 'प्रमाणित खाते' },
  'dash.farmerDashboard': { en: 'Farmer & Harvest Management Portal', mr: 'शेतकरी व पीक व्यवस्थापन पोर्टल' },
  'dash.laborerDashboard': { en: 'Agricultural Laborer Job Center', mr: 'शेतमजूर रोजगार केंद्र' },
  'dash.adminDashboard': { en: 'APMC Market State Administration', mr: 'बाजार समिती राज्य प्रशासन' },
  'dash.completeProfile': { en: 'Complete Profile', mr: 'प्रोफाइल पूर्ण करा' },
  'dash.downloadId': { en: 'Download Agrarian ID Card', mr: 'शेतकरी/मजूर ओळखपत्र डाउनलोड करा' },

  // Tabs
  'tab.jobs': { en: 'Available Jobs', mr: 'उपलब्ध शेती कामे' },
  'tab.postJobs': { en: 'Post Jobs & Workforce', mr: 'काम पोस्ट करा व मजूर शोधा' },
  'tab.location': { en: 'Farm Locations & GPS', mr: 'शेती स्थान व जीपीएस' },
  'tab.products': { en: 'Produce & Mandi Rates', mr: 'शेतीमाल व बाजारभाव' },
  'tab.farmerProducts': { en: 'Product Listing & Sales', mr: 'उत्पादन यादी व थेट विक्री' },
  'tab.earnings': { en: 'My Work & Wages', mr: 'माझी कामे व मजुरी' },
  'tab.yields': { en: 'Harvest Yields & Demand', mr: 'पीक उत्पादन व मागणी' },
  'tab.weather': { en: 'Weather & Farm Planning', mr: 'हवामान अंदाज व कृषी सल्ला' },
  'tab.admin': { en: 'APMC State Oversight', mr: 'बाजार समिती प्रशासन' },

  // Weather Component
  'weather.title': { en: 'Real-Time Farm Weather & Agro Advisory', mr: 'थेट शेती हवामान व कृषी नियोजन सल्ला' },
  'weather.subtitle': { en: 'Live meteorological observations & crop action advisory for your region', mr: 'आपल्या भागासाठी थेट हवामान निरीक्षणे व पीक नियोजन मार्गदर्शन' },
  'weather.detectGps': { en: 'Detect My Farm GPS', mr: 'माझ्या शेताचे जीपीएस शोधा' },
  'weather.detecting': { en: 'Locating...', mr: 'शोधत आहे...' },
  'weather.selectRegion': { en: 'Select Agricultural District', mr: 'कृषी जिल्हा निवडा' },
  'weather.refresh': { en: 'Refresh Weather', mr: 'हवामान अपडेट करा' },
  'weather.temperature': { en: 'Temperature', mr: 'तापमान' },
  'weather.feelsLike': { en: 'Feels like', mr: 'जाणवणारे तापमान' },
  'weather.humidity': { en: 'Relative Humidity', mr: 'हवेतील आर्द्रता' },
  'weather.windSpeed': { en: 'Wind Speed', mr: 'वाऱ्याचा वेग' },
  'weather.rainProb': { en: 'Rain Probability', mr: 'पावसाची शक्यता' },
  'weather.precipitation': { en: 'Expected Rainfall', mr: 'अपेक्षित पाऊस' },
  'weather.uvIndex': { en: 'UV Radiation Index', mr: 'अल्ट्राव्हायोलेट किरण निर्देशांक' },
  'weather.soilMoisture': { en: 'Soil Evaporation Status', mr: 'मातीतील ओलावा स्थिती' },
  'weather.forecast5Day': { en: '7-Day Agrarian Weather Outlook', mr: '७ दिवसांचा कृषी हवामान अंदाज' },
  'weather.advisoryTitle': { en: 'Agricultural Field Action Advisories', mr: 'महत्त्वाचे शेती नियोजन सल्ले' },
  'weather.spraying': { en: 'Spraying Advisory', mr: 'कीटकनाशक / खत फवारणी सल्ला' },
  'weather.sprayingGood': { en: 'Optimal for spraying: Low wind speed and no imminent rain risk.', mr: 'फवारणीसाठी अनुकूल: वाऱ्याचा वेग नियंत्रित असून पावसाचा धोका नाही.' },
  'weather.sprayingCaution': { en: 'Spraying Caution: Moderate wind or humidity may cause chemical drift.', mr: 'फवारणी सावधगिरी: मध्यम वारा किंवा आर्द्रतेमुळे औषध वाहून जाण्याची शक्यता आहे.' },
  'weather.sprayingBad': { en: 'Postpone Spraying: High wind or impending precipitation risk wash-off.', mr: 'फवारणी पुढे ढकला: जोरदार वारा अथवा पावसामुळे फवारणी वाहून जाण्याची शक्यता आहे.' },
  'weather.irrigation': { en: 'Irrigation & Pumping Schedule', mr: 'सिंचन व पाणी नियोजन' },
  'weather.irrigationSave': { en: 'Rain expected: Postpone deep irrigation to conserve groundwater and power.', mr: 'पाऊस अपेक्षित आहे: विहीर/बोअरवेलचे पाणी व वीज वाचवण्यासाठी सिंचन पुढे ढकला.' },
  'weather.irrigationNormal': { en: 'Dry conditions: Maintain regular drip/sprinkler schedule for active standing crops.', mr: 'कोरडे हवामान: उभ्या पिकांसाठी ठिबक किंवा तुषार सिंचन नियमित सुरू ठेवा.' },
  'weather.harvest': { en: 'Harvesting & Grain Drying', mr: 'कापणी व धान्य सुकवणे सल्ला' },
  'weather.harvestGood': { en: 'Dry sunny day: Favorable for crop harvesting, threshing, and sun drying.', mr: 'उघडीप व सूर्यप्रकाश: पीक काढणी, मळणी आणि धान्य वाळवण्यासाठी उत्तम परिस्थिती.' },
  'weather.harvestBad': { en: 'High moisture alert: Protect harvested grain in tarpaulin covers against dampness.', mr: 'दमट हवामान इशारा: काढलेला शेतीमाल ताडपत्रीखाली सुरक्षित झाकून ठेवा.' },
  'weather.laborSafety': { en: 'Field Labor & Shift Schedule', mr: 'शेतमजूर व कामाची वेळ सल्ला' },
  'weather.laborSafetyHot': { en: 'High heat: Schedule field labor in early morning (6:30 AM - 11 AM) and late afternoon.', mr: 'तीव्र ऊन: शेतमजुरांचे काम सकाळी (६:३० ते ११) व दुपारी ३ नंतर आयोजित करा.' },
  'weather.laborSafetyGood': { en: 'Pleasant temperature: Safe and productive working environment throughout the day.', mr: 'अनुकूल तापमान: दिवसभर शेतातील कामांसाठी वातावरण उत्तम व सुरक्षित आहे.' },

  // Weather conditions
  'weather.clear': { en: 'Clear Skies', mr: 'निरभ्र आकाश' },
  'weather.mainlyClear': { en: 'Mainly Sunny', mr: 'सूर्यप्रकाश व अंशतः ढगाळ' },
  'weather.partlyCloudy': { en: 'Partly Cloudy', mr: 'अंशतः ढगाळ' },
  'weather.overcast': { en: 'Overcast Clouds', mr: 'संपूर्ण ढगाळ' },
  'weather.fog': { en: 'Morning Fog / Mist', mr: 'धुके / दव' },
  'weather.drizzle': { en: 'Light Drizzle', mr: 'हलक्या सरी' },
  'weather.rain': { en: 'Rain Showers', mr: 'पाऊस' },
  'weather.heavyRain': { en: 'Heavy Downpour', mr: 'मुसळधार पाऊस' },
  'weather.thunderstorm': { en: 'Thunderstorm & Gusts', mr: 'वादळी वाऱ्यासह पाऊस' },

  // Quick stats
  'stat.activeJobs': { en: 'Active Field Jobs', mr: 'सक्रिय शेती कामे' },
  'stat.verifiedLaborers': { en: 'Verified Agricultural Workers', mr: 'प्रमाणित शेतमजूर' },
  'stat.cropsListed': { en: 'Farm Produce Listed', mr: 'नोंदणीकृत शेतीमाल' },
  'stat.mandiBenchmark': { en: 'APMC Mandi Benchmark Index', mr: 'कृषी उत्पन्न बाजारभाव निर्देशांक' },

  // Marketplace
  'market.title': { en: 'Direct Farm-to-Buyer Marketplace', mr: 'थेट शेतकरी ते खरेदीदार बाजारपेठ' },
  'market.subtitle': { en: 'Directly sourced agricultural grains, millets, and pulses from verified farmers with transparent APMC pricing benchmarks.', mr: 'प्रमाणित शेतकऱ्यांकडून थेट ताजे धान्य, तृणधान्ये व कडधान्ये - पारदर्शक बाजारभाव व खात्रीशीर दर्जा.' },
  'market.advisory': { en: 'Gramonnati Market Advisory', mr: 'ग्रामोन्नती बाजारभाव व विक्री सल्ला' },
  'market.refreshAdvisory': { en: 'Refresh Market Forecast', mr: 'बाजार सल्ला ताजे करा' },
  'market.orderNow': { en: 'Order Now', mr: 'खरेदी करा' },
  'market.contactFarmer': { en: 'Contact Farmer', mr: 'शेतकऱ्यांशी संपर्क साधा' },

  // General buttons
  'btn.viewDetails': { en: 'View Details', mr: 'तपशील पहा' },
  'btn.applyNow': { en: 'Apply for Work', mr: 'कामासाठी अर्ज करा' },
  'btn.postNewJob': { en: '+ Post New Farm Job', mr: '+ नवीन शेती काम पोस्ट करा' },
  'btn.listProduce': { en: '+ List Farm Produce', mr: '+ नवीन शेतीमाल नोंदवा' },
  'btn.save': { en: 'Save Changes', mr: 'बदल जतन करा' },
  'btn.cancel': { en: 'Cancel', mr: 'रद्द करा' },
  'btn.close': { en: 'Close', mr: 'बंद करा' },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isMarathi: false,
  t: (key: string, fallback?: string) => fallback || key,
  translate: (text: string) => text,
});

// WeakMaps for holding original English texts for exact restoration on English toggle
const originalTextMap = new WeakMap<Node, string>();
const originalAttrsMap = new WeakMap<Element, Record<string, string>>();

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'mr' || saved === 'en') ? saved : 'en';
  });

  const observerRef = useRef<MutationObserver | null>(null);
  const isTranslatingRef = useRef(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'mr' : 'en';
    setLanguage(next);
  };

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    if (language === 'mr') {
      const candidate = fallback || entry?.en || key;
      return translateSentenceOrPhrase(candidate);
    }
    return fallback || entry?.en || key;
  };

  const translate = (text: string): string => {
    if (language === 'mr') {
      return translateStringWithWhitespace(text);
    }
    return text;
  };

  // DOM-Level Auto-Translator Effect: Ensures 100% of website content translates to Marathi
  useEffect(() => {
    const isMr = language === 'mr';

    // Helper: translate single text node
    const translateTextNode = (node: Node) => {
      const parent = node.parentElement;
      if (!parent) return;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') return;
      if (parent.isContentEditable) return;

      const currentVal = node.nodeValue || '';
      if (!/[a-zA-Z]/.test(currentVal)) return;

      if (!originalTextMap.has(node)) {
        originalTextMap.set(node, currentVal);
      }

      const original = originalTextMap.get(node) || currentVal;
      const translated = translateStringWithWhitespace(original);
      if (translated !== currentVal) {
        node.nodeValue = translated;
      }
    };

    // Helper: restore single text node to original English
    const restoreTextNode = (node: Node) => {
      if (originalTextMap.has(node)) {
        const original = originalTextMap.get(node);
        if (original && node.nodeValue !== original) {
          node.nodeValue = original;
        }
      }
    };

    // Helper: translate element attributes (placeholder, title, aria-label)
    const translateElementAttrs = (elem: Element) => {
      const attrsToTranslate = ['placeholder', 'title', 'aria-label'];
      const currentSaved = originalAttrsMap.get(elem) || {};
      let modified = false;

      for (const attr of attrsToTranslate) {
        const val = elem.getAttribute(attr);
        if (val && /[a-zA-Z]/.test(val)) {
          if (!currentSaved[attr]) {
            currentSaved[attr] = val;
            modified = true;
          }
          const orig = currentSaved[attr] || val;
          const trans = translateSentenceOrPhrase(orig);
          if (trans !== val) {
            elem.setAttribute(attr, trans);
          }
        }
      }

      if (modified) {
        originalAttrsMap.set(elem, currentSaved);
      }
    };

    // Helper: restore element attributes to English
    const restoreElementAttrs = (elem: Element) => {
      if (originalAttrsMap.has(elem)) {
        const saved = originalAttrsMap.get(elem);
        if (saved) {
          for (const [attr, val] of Object.entries(saved)) {
            if (elem.getAttribute(attr) !== val) {
              elem.setAttribute(attr, val);
            }
          }
        }
      }
    };

    // Walk entire DOM inside #root
    const rootElem = document.getElementById('root') || document.body;

    const walkAndApply = (isToMr: boolean) => {
      isTranslatingRef.current = true;
      try {
        const walker = document.createTreeWalker(
          rootElem,
          NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
          null
        );

        let currentNode = walker.nextNode();
        while (currentNode) {
          if (currentNode.nodeType === Node.TEXT_NODE) {
            if (isToMr) {
              translateTextNode(currentNode);
            } else {
              restoreTextNode(currentNode);
            }
          } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const el = currentNode as Element;
            if (isToMr) {
              translateElementAttrs(el);
            } else {
              restoreElementAttrs(el);
            }
          }
          currentNode = walker.nextNode();
        }
      } finally {
        isTranslatingRef.current = false;
      }
    };

    // 1. Initial walk
    walkAndApply(isMr);

    // 2. Setup MutationObserver when Marathi is enabled to catch newly added nodes / tab switches
    if (isMr) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new MutationObserver((mutations) => {
        if (isTranslatingRef.current) return;

        isTranslatingRef.current = true;
        try {
          for (const mutation of mutations) {
            if (mutation.type === 'characterData' && mutation.target) {
              translateTextNode(mutation.target);
            } else if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((addedNode) => {
                if (addedNode.nodeType === Node.TEXT_NODE) {
                  translateTextNode(addedNode);
                } else if (addedNode.nodeType === Node.ELEMENT_NODE) {
                  const elem = addedNode as Element;
                  translateElementAttrs(elem);
                  const innerWalker = document.createTreeWalker(
                    elem,
                    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                    null
                  );
                  let innerCurr = innerWalker.nextNode();
                  while (innerCurr) {
                    if (innerCurr.nodeType === Node.TEXT_NODE) {
                      translateTextNode(innerCurr);
                    } else if (innerCurr.nodeType === Node.ELEMENT_NODE) {
                      translateElementAttrs(innerCurr as Element);
                    }
                    innerCurr = innerWalker.nextNode();
                  }
                }
              });
            }
          }
        } finally {
          isTranslatingRef.current = false;
        }
      });

      observer.observe(rootElem, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      observerRef.current = observer;
    } else {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isMarathi: language === 'mr',
        t,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
