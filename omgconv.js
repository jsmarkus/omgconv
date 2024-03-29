/**
* Usage:
* OMGConv.encodeString('Привет Мир!'); //encode one string
* OMGConv.encodeObject({search : 'Привет Мир!', page : 2}); //encode query object
*/
var OMGConv = (function () {
	var T = {};

	//@see http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1251.txt
	//WCTABLE 640
	T.win1251 = {
		0x0000 : 0x00, //Null
		0x0001 : 0x01, //Start Of Heading
		0x0002 : 0x02, //Start Of Text
		0x0003 : 0x03, //End Of Text
		0x0004 : 0x04, //End Of Transmission
		0x0005 : 0x05, //Enquiry
		0x0006 : 0x06, //Acknowledge
		0x0007 : 0x07, //Bell
		0x0008 : 0x08, //Backspace
		0x0009 : 0x09, //Horizontal Tabulation
		0x000a : 0x0a, //Line Feed
		0x000b : 0x0b, //Vertical Tabulation
		0x000c : 0x0c, //Form Feed
		0x000d : 0x0d, //Carriage Return
		0x000e : 0x0e, //Shift Out
		0x000f : 0x0f, //Shift In
		0x0010 : 0x10, //Data Link Escape
		0x0011 : 0x11, //Device Control One
		0x0012 : 0x12, //Device Control Two
		0x0013 : 0x13, //Device Control Three
		0x0014 : 0x14, //Device Control Four
		0x0015 : 0x15, //Negative Acknowledge
		0x0016 : 0x16, //Synchronous Idle
		0x0017 : 0x17, //End Of Transmission Block
		0x0018 : 0x18, //Cancel
		0x0019 : 0x19, //End Of Medium
		0x001a : 0x1a, //Substitute
		0x001b : 0x1b, //Escape
		0x001c : 0x1c, //File Separator
		0x001d : 0x1d, //Group Separator
		0x001e : 0x1e, //Record Separator
		0x001f : 0x1f, //Unit Separator
		0x0020 : 0x20, //Space
		0x0021 : 0x21, //Exclamation Mark
		0x0022 : 0x22, //Quotation Mark
		0x0023 : 0x23, //Number Sign
		0x0024 : 0x24, //Dollar Sign
		0x0025 : 0x25, //Percent Sign
		0x0026 : 0x26, //Ampersand
		0x0027 : 0x27, //Apostrophe
		0x0028 : 0x28, //Left Parenthesis
		0x0029 : 0x29, //Right Parenthesis
		0x002a : 0x2a, //Asterisk
		0x002b : 0x2b, //Plus Sign
		0x002c : 0x2c, //Comma
		0x002d : 0x2d, //Hyphen-Minus
		0x002e : 0x2e, //Full Stop
		0x002f : 0x2f, //Solidus
		0x0030 : 0x30, //Digit Zero
		0x0031 : 0x31, //Digit One
		0x0032 : 0x32, //Digit Two
		0x0033 : 0x33, //Digit Three
		0x0034 : 0x34, //Digit Four
		0x0035 : 0x35, //Digit Five
		0x0036 : 0x36, //Digit Six
		0x0037 : 0x37, //Digit Seven
		0x0038 : 0x38, //Digit Eight
		0x0039 : 0x39, //Digit Nine
		0x003a : 0x3a, //Colon
		0x003b : 0x3b, //Semicolon
		0x003c : 0x3c, //Less-Than Sign
		0x003d : 0x3d, //Equals Sign
		0x003e : 0x3e, //Greater-Than Sign
		0x003f : 0x3f, //Question Mark
		0x0040 : 0x40, //Commercial At
		0x0041 : 0x41, //Latin Capital Letter A
		0x0042 : 0x42, //Latin Capital Letter B
		0x0043 : 0x43, //Latin Capital Letter C
		0x0044 : 0x44, //Latin Capital Letter D
		0x0045 : 0x45, //Latin Capital Letter E
		0x0046 : 0x46, //Latin Capital Letter F
		0x0047 : 0x47, //Latin Capital Letter G
		0x0048 : 0x48, //Latin Capital Letter H
		0x0049 : 0x49, //Latin Capital Letter I
		0x004a : 0x4a, //Latin Capital Letter J
		0x004b : 0x4b, //Latin Capital Letter K
		0x004c : 0x4c, //Latin Capital Letter L
		0x004d : 0x4d, //Latin Capital Letter M
		0x004e : 0x4e, //Latin Capital Letter N
		0x004f : 0x4f, //Latin Capital Letter O
		0x0050 : 0x50, //Latin Capital Letter P
		0x0051 : 0x51, //Latin Capital Letter Q
		0x0052 : 0x52, //Latin Capital Letter R
		0x0053 : 0x53, //Latin Capital Letter S
		0x0054 : 0x54, //Latin Capital Letter T
		0x0055 : 0x55, //Latin Capital Letter U
		0x0056 : 0x56, //Latin Capital Letter V
		0x0057 : 0x57, //Latin Capital Letter W
		0x0058 : 0x58, //Latin Capital Letter X
		0x0059 : 0x59, //Latin Capital Letter Y
		0x005a : 0x5a, //Latin Capital Letter Z
		0x005b : 0x5b, //Left Square Bracket
		0x005c : 0x5c, //Reverse Solidus
		0x005d : 0x5d, //Right Square Bracket
		0x005e : 0x5e, //Circumflex Accent
		0x005f : 0x5f, //Low Line
		0x0060 : 0x60, //Grave Accent
		0x0061 : 0x61, //Latin Small Letter A
		0x0062 : 0x62, //Latin Small Letter B
		0x0063 : 0x63, //Latin Small Letter C
		0x0064 : 0x64, //Latin Small Letter D
		0x0065 : 0x65, //Latin Small Letter E
		0x0066 : 0x66, //Latin Small Letter F
		0x0067 : 0x67, //Latin Small Letter G
		0x0068 : 0x68, //Latin Small Letter H
		0x0069 : 0x69, //Latin Small Letter I
		0x006a : 0x6a, //Latin Small Letter J
		0x006b : 0x6b, //Latin Small Letter K
		0x006c : 0x6c, //Latin Small Letter L
		0x006d : 0x6d, //Latin Small Letter M
		0x006e : 0x6e, //Latin Small Letter N
		0x006f : 0x6f, //Latin Small Letter O
		0x0070 : 0x70, //Latin Small Letter P
		0x0071 : 0x71, //Latin Small Letter Q
		0x0072 : 0x72, //Latin Small Letter R
		0x0073 : 0x73, //Latin Small Letter S
		0x0074 : 0x74, //Latin Small Letter T
		0x0075 : 0x75, //Latin Small Letter U
		0x0076 : 0x76, //Latin Small Letter V
		0x0077 : 0x77, //Latin Small Letter W
		0x0078 : 0x78, //Latin Small Letter X
		0x0079 : 0x79, //Latin Small Letter Y
		0x007a : 0x7a, //Latin Small Letter Z
		0x007b : 0x7b, //Left Curly Bracket
		0x007c : 0x7c, //Vertical Line
		0x007d : 0x7d, //Right Curly Bracket
		0x007e : 0x7e, //Tilde
		0x007f : 0x7f, //Delete
		0x0098 : 0x98,
		0x00a0 : 0xa0, //No-Break Space
		0x00a4 : 0xa4, //Currency Sign
		0x00a6 : 0xa6, //Broken Bar
		0x00a7 : 0xa7, //Section Sign
		0x00a9 : 0xa9, //Copyright Sign
		0x00ab : 0xab, //Left-Pointing Double Angle Quotation Mark
		0x00ac : 0xac, //Not Sign
		0x00ad : 0xad, //Soft Hyphen
		0x00ae : 0xae, //Registered Sign
		0x00b0 : 0xb0, //Degree Sign
		0x00b1 : 0xb1, //Plus-Minus Sign
		0x00b5 : 0xb5, //Micro Sign
		0x00b6 : 0xb6, //Pilcrow Sign
		0x00b7 : 0xb7, //Middle Dot
		0x00bb : 0xbb, //Right-Pointing Double Angle Quotation Mark
		0x00c0 : 0x41, //Latin Capital Letter A With Grave
		0x00c1 : 0x41, //Latin Capital Letter A With Acute
		0x00c2 : 0x41, //Latin Capital Letter A With Circumflex
		0x00c3 : 0x41, //Latin Capital Letter A With Tilde
		0x00c4 : 0x41, //Latin Capital Letter A With Diaeresis
		0x00c5 : 0x41, //Latin Capital Letter A With Ring Above
		0x00c7 : 0x43, //Latin Capital Letter C With Cedilla
		0x00c8 : 0x45, //Latin Capital Letter E With Grave
		0x00c9 : 0x45, //Latin Capital Letter E With Acute
		0x00ca : 0x45, //Latin Capital Letter E With Circumflex
		0x00cb : 0x45, //Latin Capital Letter E With Diaeresis
		0x00cc : 0x49, //Latin Capital Letter I With Grave
		0x00cd : 0x49, //Latin Capital Letter I With Acute
		0x00ce : 0x49, //Latin Capital Letter I With Circumflex
		0x00cf : 0x49, //Latin Capital Letter I With Diaeresis
		0x00d1 : 0x4e, //Latin Capital Letter N With Tilde
		0x00d2 : 0x4f, //Latin Capital Letter O With Grave
		0x00d3 : 0x4f, //Latin Capital Letter O With Acute
		0x00d4 : 0x4f, //Latin Capital Letter O With Circumflex
		0x00d5 : 0x4f, //Latin Capital Letter O With Tilde
		0x00d6 : 0x4f, //Latin Capital Letter O With Diaeresis
		0x00d8 : 0x4f, //Latin Capital Letter O With Stroke
		0x00d9 : 0x55, //Latin Capital Letter U With Grave
		0x00da : 0x55, //Latin Capital Letter U With Acute
		0x00db : 0x55, //Latin Capital Letter U With Circumflex
		0x00dc : 0x55, //Latin Capital Letter U With Diaeresis
		0x00dd : 0x59, //Latin Capital Letter Y With Acute
		0x00e0 : 0x61, //Latin Small Letter A With Grave
		0x00e1 : 0x61, //Latin Small Letter A With Acute
		0x00e2 : 0x61, //Latin Small Letter A With Circumflex
		0x00e3 : 0x61, //Latin Small Letter A With Tilde
		0x00e4 : 0x61, //Latin Small Letter A With Diaeresis
		0x00e5 : 0x61, //Latin Small Letter A With Ring Above
		0x00e7 : 0x63, //Latin Small Letter C With Cedilla
		0x00e8 : 0x65, //Latin Small Letter E With Grave
		0x00e9 : 0x65, //Latin Small Letter E With Acute
		0x00ea : 0x65, //Latin Small Letter E With Circumflex
		0x00eb : 0x65, //Latin Small Letter E With Diaeresis
		0x00ec : 0x69, //Latin Small Letter I With Grave
		0x00ed : 0x69, //Latin Small Letter I With Acute
		0x00ee : 0x69, //Latin Small Letter I With Circumflex
		0x00ef : 0x69, //Latin Small Letter I With Diaeresis
		0x00f1 : 0x6e, //Latin Small Letter N With Tilde
		0x00f2 : 0x6f, //Latin Small Letter O With Grave
		0x00f3 : 0x6f, //Latin Small Letter O With Acute
		0x00f4 : 0x6f, //Latin Small Letter O With Circumflex
		0x00f5 : 0x6f, //Latin Small Letter O With Tilde
		0x00f6 : 0x6f, //Latin Small Letter O With Diaeresis
		0x00f8 : 0x6f, //Latin Small Letter O With Stroke
		0x00f9 : 0x75, //Latin Small Letter U With Grave
		0x00fa : 0x75, //Latin Small Letter U With Acute
		0x00fb : 0x75, //Latin Small Letter U With Circumflex
		0x00fc : 0x75, //Latin Small Letter U With Diaeresis
		0x00fd : 0x79, //Latin Small Letter Y With Acute
		0x00ff : 0x79, //Latin Small Letter Y With Diaeresis
		0x0100 : 0x41, //Latin Capital Letter A With Macron
		0x0101 : 0x61, //Latin Small Letter A With Macron
		0x0102 : 0x41, //Latin Capital Letter A With Breve
		0x0103 : 0x61, //Latin Small Letter A With Breve
		0x0104 : 0x41, //Latin Capital Letter A With Ogonek
		0x0105 : 0x61, //Latin Small Letter A With Ogonek
		0x0106 : 0x43, //Latin Capital Letter C With Acute
		0x0107 : 0x63, //Latin Small Letter C With Acute
		0x0108 : 0x43, //Latin Capital Letter C With Circumflex
		0x0109 : 0x63, //Latin Small Letter C With Circumflex
		0x010a : 0x43, //Latin Capital Letter C With Dot Above
		0x010b : 0x63, //Latin Small Letter C With Dot Above
		0x010c : 0x43, //Latin Capital Letter C With Caron
		0x010d : 0x63, //Latin Small Letter C With Caron
		0x010e : 0x44, //Latin Capital Letter D With Caron
		0x010f : 0x64, //Latin Small Letter D With Caron
		0x0110 : 0x44, //Latin Capital Letter D With Stroke
		0x0111 : 0x64, //Latin Small Letter D With Stroke
		0x0112 : 0x45, //Latin Capital Letter E With Macron
		0x0113 : 0x65, //Latin Small Letter E With Macron
		0x0114 : 0x45, //Latin Capital Letter E With Breve
		0x0115 : 0x65, //Latin Small Letter E With Breve
		0x0116 : 0x45, //Latin Capital Letter E With Dot Above
		0x0117 : 0x65, //Latin Small Letter E With Dot Above
		0x0118 : 0x45, //Latin Capital Letter E With Ogonek
		0x0119 : 0x65, //Latin Small Letter E With Ogonek
		0x011a : 0x45, //Latin Capital Letter E With Caron
		0x011b : 0x65, //Latin Small Letter E With Caron
		0x011c : 0x47, //Latin Capital Letter G With Circumflex
		0x011d : 0x67, //Latin Small Letter G With Circumflex
		0x011e : 0x47, //Latin Capital Letter G With Breve
		0x011f : 0x67, //Latin Small Letter G With Breve
		0x0120 : 0x47, //Latin Capital Letter G With Dot Above
		0x0121 : 0x67, //Latin Small Letter G With Dot Above
		0x0122 : 0x47, //Latin Capital Letter G With Cedilla
		0x0123 : 0x67, //Latin Small Letter G With Cedilla
		0x0124 : 0x48, //Latin Capital Letter H With Circumflex
		0x0125 : 0x68, //Latin Small Letter H With Circumflex
		0x0126 : 0x48, //Latin Capital Letter H With Stroke
		0x0127 : 0x68, //Latin Small Letter H With Stroke
		0x0128 : 0x49, //Latin Capital Letter I With Tilde
		0x0129 : 0x69, //Latin Small Letter I With Tilde
		0x012a : 0x49, //Latin Capital Letter I With Macron
		0x012b : 0x69, //Latin Small Letter I With Macron
		0x012c : 0x49, //Latin Capital Letter I With Breve
		0x012d : 0x69, //Latin Small Letter I With Breve
		0x012e : 0x49, //Latin Capital Letter I With Ogonek
		0x012f : 0x69, //Latin Small Letter I With Ogonek
		0x0130 : 0x49, //Latin Capital Letter I With Dot Above
		0x0134 : 0x4a, //Latin Capital Letter J With Circumflex
		0x0135 : 0x6a, //Latin Small Letter J With Circumflex
		0x0136 : 0x4b, //Latin Capital Letter K With Cedilla
		0x0137 : 0x6b, //Latin Small Letter K With Cedilla
		0x0139 : 0x4c, //Latin Capital Letter L With Acute
		0x013a : 0x6c, //Latin Small Letter L With Acute
		0x013b : 0x4c, //Latin Capital Letter L With Cedilla
		0x013c : 0x6c, //Latin Small Letter L With Cedilla
		0x013d : 0x4c, //Latin Capital Letter L With Caron
		0x013e : 0x6c, //Latin Small Letter L With Caron
		0x0141 : 0x4c, //Latin Capital Letter L With Stroke
		0x0142 : 0x6c, //Latin Small Letter L With Stroke
		0x0143 : 0x4e, //Latin Capital Letter N With Acute
		0x0144 : 0x6e, //Latin Small Letter N With Acute
		0x0145 : 0x4e, //Latin Capital Letter N With Cedilla
		0x0146 : 0x6e, //Latin Small Letter N With Cedilla
		0x0147 : 0x4e, //Latin Capital Letter N With Caron
		0x0148 : 0x6e, //Latin Small Letter N With Caron
		0x014c : 0x4f, //Latin Capital Letter O With Macron
		0x014d : 0x6f, //Latin Small Letter O With Macron
		0x014e : 0x4f, //Latin Capital Letter O With Breve
		0x014f : 0x6f, //Latin Small Letter O With Breve
		0x0150 : 0x4f, //Latin Capital Letter O With Double Acute
		0x0151 : 0x6f, //Latin Small Letter O With Double Acute
		0x0154 : 0x52, //Latin Capital Letter R With Acute
		0x0155 : 0x72, //Latin Small Letter R With Acute
		0x0156 : 0x52, //Latin Capital Letter R With Cedilla
		0x0157 : 0x72, //Latin Small Letter R With Cedilla
		0x0158 : 0x52, //Latin Capital Letter R With Caron
		0x0159 : 0x72, //Latin Small Letter R With Caron
		0x015a : 0x53, //Latin Capital Letter S With Acute
		0x015b : 0x73, //Latin Small Letter S With Acute
		0x015c : 0x53, //Latin Capital Letter S With Circumflex
		0x015d : 0x73, //Latin Small Letter S With Circumflex
		0x015e : 0x53, //Latin Capital Letter S With Cedilla
		0x015f : 0x73, //Latin Small Letter S With Cedilla
		0x0160 : 0x53, //Latin Capital Letter S With Caron
		0x0161 : 0x73, //Latin Small Letter S With Caron
		0x0162 : 0x54, //Latin Capital Letter T With Cedilla
		0x0163 : 0x74, //Latin Small Letter T With Cedilla
		0x0164 : 0x54, //Latin Capital Letter T With Caron
		0x0165 : 0x74, //Latin Small Letter T With Caron
		0x0166 : 0x54, //Latin Capital Letter T With Stroke
		0x0167 : 0x74, //Latin Small Letter T With Stroke
		0x0168 : 0x55, //Latin Capital Letter U With Tilde
		0x0169 : 0x75, //Latin Small Letter U With Tilde
		0x016a : 0x55, //Latin Capital Letter U With Macron
		0x016b : 0x75, //Latin Small Letter U With Macron
		0x016c : 0x55, //Latin Capital Letter U With Breve
		0x016d : 0x75, //Latin Small Letter U With Breve
		0x016e : 0x55, //Latin Capital Letter U With Ring Above
		0x016f : 0x75, //Latin Small Letter U With Ring Above
		0x0170 : 0x55, //Latin Capital Letter U With Double Acute
		0x0171 : 0x75, //Latin Small Letter U With Double Acute
		0x0172 : 0x55, //Latin Capital Letter U With Ogonek
		0x0173 : 0x75, //Latin Small Letter U With Ogonek
		0x0174 : 0x57, //Latin Capital Letter W With Circumflex
		0x0175 : 0x77, //Latin Small Letter W With Circumflex
		0x0176 : 0x59, //Latin Capital Letter Y With Circumflex
		0x0177 : 0x79, //Latin Small Letter Y With Circumflex
		0x0178 : 0x59, //Latin Capital Letter Y With Diaeresis
		0x0179 : 0x5a, //Latin Capital Letter Z With Acute
		0x017a : 0x7a, //Latin Small Letter Z With Acute
		0x017b : 0x5a, //Latin Capital Letter Z With Dot Above
		0x017c : 0x7a, //Latin Small Letter Z With Dot Above
		0x017d : 0x5a, //Latin Capital Letter Z With Caron
		0x017e : 0x7a, //Latin Small Letter Z With Caron
		0x0180 : 0x62, //Latin Small Letter B With Stroke
		0x0197 : 0x49, //Latin Capital Letter I With Stroke
		0x019a : 0x6c, //Latin Small Letter L With Bar
		0x019f : 0x4f, //Latin Capital Letter O With Middle Tilde
		0x01a0 : 0x4f, //Latin Capital Letter O With Horn
		0x01a1 : 0x6f, //Latin Small Letter O With Horn
		0x01ab : 0x74, //Latin Small Letter T With Palatal Hook
		0x01ae : 0x54, //Latin Capital Letter T With Retroflex Hook
		0x01af : 0x55, //Latin Capital Letter U With Horn
		0x01b0 : 0x75, //Latin Small Letter U With Horn
		0x01cd : 0x41, //Latin Capital Letter A With Caron
		0x01ce : 0x61, //Latin Small Letter A With Caron
		0x01cf : 0x49, //Latin Capital Letter I With Caron
		0x01d0 : 0x69, //Latin Small Letter I With Caron
		0x01d1 : 0x4f, //Latin Capital Letter O With Caron
		0x01d2 : 0x6f, //Latin Small Letter O With Caron
		0x01d3 : 0x55, //Latin Capital Letter U With Caron
		0x01d4 : 0x75, //Latin Small Letter U With Caron
		0x01d5 : 0x55, //Latin Capital Letter U With Diaeresis And Macron
		0x01d6 : 0x75, //Latin Small Letter U With Diaeresis And Macron
		0x01d7 : 0x55, //Latin Capital Letter U With Diaeresis And Acute
		0x01d8 : 0x75, //Latin Small Letter U With Diaeresis And Acute
		0x01d9 : 0x55, //Latin Capital Letter U With Diaeresis And Caron
		0x01da : 0x75, //Latin Small Letter U With Diaeresis And Caron
		0x01db : 0x55, //Latin Capital Letter U With Diaeresis And Grave
		0x01dc : 0x75, //Latin Small Letter U With Diaeresis And Grave
		0x01de : 0x41, //Latin Capital Letter A With Diaeresis And Macron
		0x01df : 0x61, //Latin Small Letter A With Diaeresis And Macron
		0x01e4 : 0x47, //Latin Capital Letter G With Stroke
		0x01e5 : 0x67, //Latin Small Letter G With Stroke
		0x01e6 : 0x47, //Latin Capital Letter G With Caron
		0x01e7 : 0x67, //Latin Small Letter G With Caron
		0x01e8 : 0x4b, //Latin Capital Letter K With Caron
		0x01e9 : 0x6b, //Latin Small Letter K With Caron
		0x01ea : 0x4f, //Latin Capital Letter O With Ogonek
		0x01eb : 0x6f, //Latin Small Letter O With Ogonek
		0x01ec : 0x4f, //Latin Capital Letter O With Ogonek And Macron
		0x01ed : 0x6f, //Latin Small Letter O With Ogonek And Macron
		0x01f0 : 0x6a, //Latin Small Letter J With Caron
		0x0401 : 0xa8, //Cyrillic Capital Letter Io
		0x0402 : 0x80, //Cyrillic Capital Letter Dje
		0x0403 : 0x81, //Cyrillic Capital Letter Gje
		0x0404 : 0xaa, //Cyrillic Capital Letter Ukrainian Ie
		0x0405 : 0xbd, //Cyrillic Capital Letter Dze
		0x0406 : 0xb2, //Cyrillic Capital Letter Byelorussian-Ukrainian I
		0x0407 : 0xaf, //Cyrillic Capital Letter Yi
		0x0408 : 0xa3, //Cyrillic Capital Letter Je
		0x0409 : 0x8a, //Cyrillic Capital Letter Lje
		0x040a : 0x8c, //Cyrillic Capital Letter Nje
		0x040b : 0x8e, //Cyrillic Capital Letter Tshe
		0x040c : 0x8d, //Cyrillic Capital Letter Kje
		0x040e : 0xa1, //Cyrillic Capital Letter Short U
		0x040f : 0x8f, //Cyrillic Capital Letter Dzhe
		0x0410 : 0xc0, //Cyrillic Capital Letter A
		0x0411 : 0xc1, //Cyrillic Capital Letter Be
		0x0412 : 0xc2, //Cyrillic Capital Letter Ve
		0x0413 : 0xc3, //Cyrillic Capital Letter Ghe
		0x0414 : 0xc4, //Cyrillic Capital Letter De
		0x0415 : 0xc5, //Cyrillic Capital Letter Ie
		0x0416 : 0xc6, //Cyrillic Capital Letter Zhe
		0x0417 : 0xc7, //Cyrillic Capital Letter Ze
		0x0418 : 0xc8, //Cyrillic Capital Letter I
		0x0419 : 0xc9, //Cyrillic Capital Letter Short I
		0x041a : 0xca, //Cyrillic Capital Letter Ka
		0x041b : 0xcb, //Cyrillic Capital Letter El
		0x041c : 0xcc, //Cyrillic Capital Letter Em
		0x041d : 0xcd, //Cyrillic Capital Letter En
		0x041e : 0xce, //Cyrillic Capital Letter O
		0x041f : 0xcf, //Cyrillic Capital Letter Pe
		0x0420 : 0xd0, //Cyrillic Capital Letter Er
		0x0421 : 0xd1, //Cyrillic Capital Letter Es
		0x0422 : 0xd2, //Cyrillic Capital Letter Te
		0x0423 : 0xd3, //Cyrillic Capital Letter U
		0x0424 : 0xd4, //Cyrillic Capital Letter Ef
		0x0425 : 0xd5, //Cyrillic Capital Letter Ha
		0x0426 : 0xd6, //Cyrillic Capital Letter Tse
		0x0427 : 0xd7, //Cyrillic Capital Letter Che
		0x0428 : 0xd8, //Cyrillic Capital Letter Sha
		0x0429 : 0xd9, //Cyrillic Capital Letter Shcha
		0x042a : 0xda, //Cyrillic Capital Letter Hard Sign
		0x042b : 0xdb, //Cyrillic Capital Letter Yeru
		0x042c : 0xdc, //Cyrillic Capital Letter Soft Sign
		0x042d : 0xdd, //Cyrillic Capital Letter E
		0x042e : 0xde, //Cyrillic Capital Letter Yu
		0x042f : 0xdf, //Cyrillic Capital Letter Ya
		0x0430 : 0xe0, //Cyrillic Small Letter A
		0x0431 : 0xe1, //Cyrillic Small Letter Be
		0x0432 : 0xe2, //Cyrillic Small Letter Ve
		0x0433 : 0xe3, //Cyrillic Small Letter Ghe
		0x0434 : 0xe4, //Cyrillic Small Letter De
		0x0435 : 0xe5, //Cyrillic Small Letter Ie
		0x0436 : 0xe6, //Cyrillic Small Letter Zhe
		0x0437 : 0xe7, //Cyrillic Small Letter Ze
		0x0438 : 0xe8, //Cyrillic Small Letter I
		0x0439 : 0xe9, //Cyrillic Small Letter Short I
		0x043a : 0xea, //Cyrillic Small Letter Ka
		0x043b : 0xeb, //Cyrillic Small Letter El
		0x043c : 0xec, //Cyrillic Small Letter Em
		0x043d : 0xed, //Cyrillic Small Letter En
		0x043e : 0xee, //Cyrillic Small Letter O
		0x043f : 0xef, //Cyrillic Small Letter Pe
		0x0440 : 0xf0, //Cyrillic Small Letter Er
		0x0441 : 0xf1, //Cyrillic Small Letter Es
		0x0442 : 0xf2, //Cyrillic Small Letter Te
		0x0443 : 0xf3, //Cyrillic Small Letter U
		0x0444 : 0xf4, //Cyrillic Small Letter Ef
		0x0445 : 0xf5, //Cyrillic Small Letter Ha
		0x0446 : 0xf6, //Cyrillic Small Letter Tse
		0x0447 : 0xf7, //Cyrillic Small Letter Che
		0x0448 : 0xf8, //Cyrillic Small Letter Sha
		0x0449 : 0xf9, //Cyrillic Small Letter Shcha
		0x044a : 0xfa, //Cyrillic Small Letter Hard Sign
		0x044b : 0xfb, //Cyrillic Small Letter Yeru
		0x044c : 0xfc, //Cyrillic Small Letter Soft Sign
		0x044d : 0xfd, //Cyrillic Small Letter E
		0x044e : 0xfe, //Cyrillic Small Letter Yu
		0x044f : 0xff, //Cyrillic Small Letter Ya
		0x0451 : 0xb8, //Cyrillic Small Letter Io
		0x0452 : 0x90, //Cyrillic Small Letter Dje
		0x0453 : 0x83, //Cyrillic Small Letter Gje
		0x0454 : 0xba, //Cyrillic Small Letter Ukrainian Ie
		0x0455 : 0xbe, //Cyrillic Small Letter Dze
		0x0456 : 0xb3, //Cyrillic Small Letter Byelorussian-Ukrainian I
		0x0457 : 0xbf, //Cyrillic Small Letter Yi
		0x0458 : 0xbc, //Cyrillic Small Letter Je
		0x0459 : 0x9a, //Cyrillic Small Letter Lje
		0x045a : 0x9c, //Cyrillic Small Letter Nje
		0x045b : 0x9e, //Cyrillic Small Letter Tshe
		0x045c : 0x9d, //Cyrillic Small Letter Kje
		0x045e : 0xa2, //Cyrillic Small Letter Short U
		0x045f : 0x9f, //Cyrillic Small Letter Dzhe
		0x0490 : 0xa5, //Cyrillic Capital Letter Ghe With Upturn
		0x0491 : 0xb4, //Cyrillic Small Letter Ghe With Upturn
		0x2013 : 0x96, //En Dash
		0x2014 : 0x97, //Em Dash
		0x2018 : 0x91, //Left Single Quotation Mark
		0x2019 : 0x92, //Right Single Quotation Mark
		0x201a : 0x82, //Single Low-9 Quotation Mark
		0x201c : 0x93, //Left Double Quotation Mark
		0x201d : 0x94, //Right Double Quotation Mark
		0x201e : 0x84, //Double Low-9 Quotation Mark
		0x2020 : 0x86, //Dagger
		0x2021 : 0x87, //Double Dagger
		0x2022 : 0x95, //Bullet
		0x2026 : 0x85, //Horizontal Ellipsis
		0x2030 : 0x89, //Per Mille Sign
		0x2039 : 0x8b, //Single Left-Pointing Angle Quotation Mark
		0x203a : 0x9b, //Single Right-Pointing Angle Quotation Mark
		0x203c : 0x21, //Double Exclamation Mark
		0x20ac : 0x88, //Euro Sign
		0x2116 : 0xb9, //Numero Sign
		0x2122 : 0x99, //Trade Mark Sign
		0x2190 : 0x3c, //Leftwards Arrow
		0x2191 : 0x5e, //Upwards Arrow
		0x2192 : 0x3e, //Rightwards Arrow
		0x2193 : 0x76, //Downwards Arrow
		0x2194 : 0x2d, //Left Right Arrow
		0x2195 : 0xa6, //Up Down Arrow
		0x21a8 : 0xa6, //Up Down Arrow With Base
		0x2219 : 0x95, //Bullet Operator
		0x221a : 0x76, //Square Root
		0x221f : 0x4c, //Right Angle
		0x2302 : 0xa6, //House
		0x2500 : 0x2d, //Box Drawings Light Horizontal
		0x2502 : 0xa6, //Box Drawings Light Vertical
		0x250c : 0x2d, //Box Drawings Light Down And Right
		0x2510 : 0xac, //Box Drawings Light Down And Left
		0x2514 : 0x4c, //Box Drawings Light Up And Right
		0x2518 : 0x2d, //Box Drawings Light Up And Left
		0x251c : 0x2b, //Box Drawings Light Vertical And Right
		0x2524 : 0x2b, //Box Drawings Light Vertical And Left
		0x252c : 0x54, //Box Drawings Light Down And Horizontal
		0x2534 : 0x2b, //Box Drawings Light Up And Horizontal
		0x253c : 0x2b, //Box Drawings Light Vertical And Horizontal
		0x2550 : 0x3d, //Box Drawings Double Horizontal
		0x2551 : 0xa6, //Box Drawings Double Vertical
		0x2552 : 0x2d, //Box Drawings Down Single And Right Double
		0x2553 : 0xe3, //Box Drawings Down Double And Right Single
		0x2554 : 0xe3, //Box Drawings Double Down And Right
		0x2555 : 0xac, //Box Drawings Down Single And Left Double
		0x2556 : 0xac, //Box Drawings Down Double And Left Single
		0x2557 : 0xac, //Box Drawings Double Down And Left
		0x2558 : 0x4c, //Box Drawings Up Single And Right Double
		0x2559 : 0x4c, //Box Drawings Up Double And Right Single
		0x255a : 0x4c, //Box Drawings Double Up And Right
		0x255b : 0x2d, //Box Drawings Up Single And Left Double
		0x255c : 0x2d, //Box Drawings Up Double And Left Single
		0x255d : 0x2d, //Box Drawings Double Up And Left
		0x255e : 0xa6, //Box Drawings Vertical Single And Right Double
		0x255f : 0xa6, //Box Drawings Vertical Double And Right Single
		0x2560 : 0xa6, //Box Drawings Double Vertical And Right
		0x2561 : 0xa6, //Box Drawings Vertical Single And Left Double
		0x2562 : 0xa6, //Box Drawings Vertical Double And Left Single
		0x2563 : 0xa6, //Box Drawings Double Vertical And Left
		0x2564 : 0x54, //Box Drawings Down Single And Horizontal Double
		0x2565 : 0x54, //Box Drawings Down Double And Horizontal Single
		0x2566 : 0x54, //Box Drawings Double Down And Horizontal
		0x2567 : 0xa6, //Box Drawings Up Single And Horizontal Double
		0x2568 : 0xa6, //Box Drawings Up Double And Horizontal Single
		0x2569 : 0xa6, //Box Drawings Double Up And Horizontal
		0x256a : 0x2b, //Box Drawings Vertical Single And Horizontal Double
		0x256b : 0x2b, //Box Drawings Vertical Double And Horizontal Single
		0x256c : 0x2b, //Box Drawings Double Vertical And Horizontal
		0x2580 : 0x2d, //Upper Half Block
		0x2584 : 0x2d, //Lower Half Block
		0x2588 : 0x2d, //Full Block
		0x258c : 0xa6, //Left Half Block
		0x2590 : 0xa6, //Right Half Block
		0x2591 : 0x2d, //Light Shade
		0x2592 : 0x2d, //Medium Shade
		0x2593 : 0x2d, //Dark Shade
		0x25a0 : 0xa6, //Black Square
		0x25ac : 0x2d, //Black Rectangle
		0x25b2 : 0x5e, //Black Up-Pointing Triangle
		0x25ba : 0x3e, //Black Right-Pointing Pointer
		0x25bc : 0xa1, //Black Down-Pointing Triangle
		0x25c4 : 0x3c, //Black Left-Pointing Pointer
		0x25cb : 0x30, //White Circle
		0x25d8 : 0x95, //Inverse Bullet
		0x25d9 : 0x30, //Inverse White Circle
		0x263a : 0x4f, //White Smiling Face
		0x263b : 0x4f, //Black Smiling Face
		0x263c : 0x30, //White Sun With Rays
		0x2640 : 0x2b, //Female Sign
		0x2642 : 0x3e, //Male Sign
		0x2660 : 0xa6, //Black Spade Suit
		0x2663 : 0xa6, //Black Club Suit
		0x2665 : 0xa6, //Black Heart Suit
		0x2666 : 0xa6, //Black Diamond Suit
		0x266a : 0x64, //Eighth Note
		0x266b : 0x64, //Beamed Eighth Notes
		0xff01 : 0x21, //Fullwidth Exclamation Mark
		0xff02 : 0x22, //Fullwidth Quotation Mark
		0xff03 : 0x23, //Fullwidth Number Sign
		0xff04 : 0x24, //Fullwidth Dollar Sign
		0xff05 : 0x25, //Fullwidth Percent Sign
		0xff06 : 0x26, //Fullwidth Ampersand
		0xff07 : 0x27, //Fullwidth Apostrophe
		0xff08 : 0x28, //Fullwidth Left Parenthesis
		0xff09 : 0x29, //Fullwidth Right Parenthesis
		0xff0a : 0x2a, //Fullwidth Asterisk
		0xff0b : 0x2b, //Fullwidth Plus Sign
		0xff0c : 0x2c, //Fullwidth Comma
		0xff0d : 0x2d, //Fullwidth Hyphen-Minus
		0xff0e : 0x2e, //Fullwidth Full Stop
		0xff0f : 0x2f, //Fullwidth Solidus
		0xff10 : 0x30, //Fullwidth Digit Zero
		0xff11 : 0x31, //Fullwidth Digit One
		0xff12 : 0x32, //Fullwidth Digit Two
		0xff13 : 0x33, //Fullwidth Digit Three
		0xff14 : 0x34, //Fullwidth Digit Four
		0xff15 : 0x35, //Fullwidth Digit Five
		0xff16 : 0x36, //Fullwidth Digit Six
		0xff17 : 0x37, //Fullwidth Digit Seven
		0xff18 : 0x38, //Fullwidth Digit Eight
		0xff19 : 0x39, //Fullwidth Digit Nine
		0xff1a : 0x3a, //Fullwidth Colon
		0xff1b : 0x3b, //Fullwidth Semicolon
		0xff1c : 0x3c, //Fullwidth Less-Than Sign
		0xff1d : 0x3d, //Fullwidth Equals Sign
		0xff1e : 0x3e, //Fullwidth Greater-Than Sign
		0xff1f : 0x3f, //Fullwidth Question Mark
		0xff20 : 0x40, //Fullwidth Commercial At
		0xff21 : 0x41, //Fullwidth Latin Capital Letter A
		0xff22 : 0x42, //Fullwidth Latin Capital Letter B
		0xff23 : 0x43, //Fullwidth Latin Capital Letter C
		0xff24 : 0x44, //Fullwidth Latin Capital Letter D
		0xff25 : 0x45, //Fullwidth Latin Capital Letter E
		0xff26 : 0x46, //Fullwidth Latin Capital Letter F
		0xff27 : 0x47, //Fullwidth Latin Capital Letter G
		0xff28 : 0x48, //Fullwidth Latin Capital Letter H
		0xff29 : 0x49, //Fullwidth Latin Capital Letter I
		0xff2a : 0x4a, //Fullwidth Latin Capital Letter J
		0xff2b : 0x4b, //Fullwidth Latin Capital Letter K
		0xff2c : 0x4c, //Fullwidth Latin Capital Letter L
		0xff2d : 0x4d, //Fullwidth Latin Capital Letter M
		0xff2e : 0x4e, //Fullwidth Latin Capital Letter N
		0xff2f : 0x4f, //Fullwidth Latin Capital Letter O
		0xff30 : 0x50, //Fullwidth Latin Capital Letter P
		0xff31 : 0x51, //Fullwidth Latin Capital Letter Q
		0xff32 : 0x52, //Fullwidth Latin Capital Letter R
		0xff33 : 0x53, //Fullwidth Latin Capital Letter S
		0xff34 : 0x54, //Fullwidth Latin Capital Letter T
		0xff35 : 0x55, //Fullwidth Latin Capital Letter U
		0xff36 : 0x56, //Fullwidth Latin Capital Letter V
		0xff37 : 0x57, //Fullwidth Latin Capital Letter W
		0xff38 : 0x58, //Fullwidth Latin Capital Letter X
		0xff39 : 0x59, //Fullwidth Latin Capital Letter Y
		0xff3a : 0x5a, //Fullwidth Latin Capital Letter Z
		0xff3b : 0x5b, //Fullwidth Left Square Bracket
		0xff3c : 0x5c, //Fullwidth Reverse Solidus
		0xff3d : 0x5d, //Fullwidth Right Square Bracket
		0xff3e : 0x5e, //Fullwidth Circumflex Accent
		0xff3f : 0x5f, //Fullwidth Low Line
		0xff40 : 0x60, //Fullwidth Grave Accent
		0xff41 : 0x61, //Fullwidth Latin Small Letter A
		0xff42 : 0x62, //Fullwidth Latin Small Letter B
		0xff43 : 0x63, //Fullwidth Latin Small Letter C
		0xff44 : 0x64, //Fullwidth Latin Small Letter D
		0xff45 : 0x65, //Fullwidth Latin Small Letter E
		0xff46 : 0x66, //Fullwidth Latin Small Letter F
		0xff47 : 0x67, //Fullwidth Latin Small Letter G
		0xff48 : 0x68, //Fullwidth Latin Small Letter H
		0xff49 : 0x69, //Fullwidth Latin Small Letter I
		0xff4a : 0x6a, //Fullwidth Latin Small Letter J
		0xff4b : 0x6b, //Fullwidth Latin Small Letter K
		0xff4c : 0x6c, //Fullwidth Latin Small Letter L
		0xff4d : 0x6d, //Fullwidth Latin Small Letter M
		0xff4e : 0x6e, //Fullwidth Latin Small Letter N
		0xff4f : 0x6f, //Fullwidth Latin Small Letter O
		0xff50 : 0x70, //Fullwidth Latin Small Letter P
		0xff51 : 0x71, //Fullwidth Latin Small Letter Q
		0xff52 : 0x72, //Fullwidth Latin Small Letter R
		0xff53 : 0x73, //Fullwidth Latin Small Letter S
		0xff54 : 0x74, //Fullwidth Latin Small Letter T
		0xff55 : 0x75, //Fullwidth Latin Small Letter U
		0xff56 : 0x76, //Fullwidth Latin Small Letter V
		0xff57 : 0x77, //Fullwidth Latin Small Letter W
		0xff58 : 0x78, //Fullwidth Latin Small Letter X
		0xff59 : 0x79, //Fullwidth Latin Small Letter Y
		0xff5a : 0x7a, //Fullwidth Latin Small Letter Z
		0xff5b : 0x7b, //Fullwidth Left Curly Bracket
		0xff5c : 0x7c, //Fullwidth Vertical Line
		0xff5d : 0x7d, //Fullwidth Right Curly Bracket
		0xff5e : 0x7e, //Fullwidth Tilde
	};

	function _encodeString (input, table) {
		out = [];
		for(var i = 0; i < input.length; i++) {
			var c = input.charCodeAt(i);
			var oc = table[c];
			if(undefined === oc) {
				continue;
			}
			var ue = '%' + oc.toString(16).toUpperCase();
			out.push(ue);
		}
		return out.join('');
	}

	function _encodeObject (obj, table) {
		var parts = [];
		for (var propName in obj) {
			if(!obj.hasOwnProperty(propName)) {
				return;
			}

			var key = propName;
			var val = _encodeString(obj[propName], table);
			parts.push(key + '=' + val);
		}
		return parts.join('&');
	}

	return {
		/**
		* Encode UTF-8 string to URL-encoded string in given charset
		* @name OMGConv.encodeString
		* @param {String} str string to encode
		* @param {String} charset charset (default is win1251). Currently only win1251 is supported
		*/
		encodeString : function (str, charset) {
			if(!charset) {
				charset = 'win1251';
			}
			var table = T[charset];
			if(!table) {
				throw new Error('No such charset ' + charset);
			}
			return _encodeString(str, table);
		},
		/**
		* Encode query object into URL-encoded query string in given charset
		* @name OMGConv.encodeObject
		* @param {String} obj object to encode
		* @param {String} charset charset (default is win1251). Currently only win1251 is supported
		*/
		encodeObject : function (obj, charset) {
			if(!charset) {
				charset = 'win1251';
			}
			var table = T[charset];
			if(!table) {
				throw new Error('No such charset ' + charset);
			}
			return _encodeObject(obj, table);
		}
	}

}());