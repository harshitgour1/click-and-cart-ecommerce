/**
 * Component Showcase - Demo file for Indian-themed UI components
 * This file demonstrates all the enhanced components with Indian aesthetics
 * 
 * Usage: Import this component in a page to see all components in action
 */

import React from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import { MandalaSpinner } from './MandalaSpinner';
import { PaisleyLoader } from './PaisleyLoader';
import { ButtonLoader } from './ButtonLoader';
import { Skeleton, SkeletonCard } from './Skeleton';

export const ComponentShowcase: React.FC = () => {
  return (
    <div className="p-8 space-y-12 bg-neutral-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">
          Indian-Themed UI Components
        </h1>
        <p className="text-neutral-600 mb-8">
          Enhanced component library with Indian aesthetics, soft colors, and delightful animations
        </p>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" isLoading>Loading</Button>
            <Button variant="primary" withPattern>With Pattern</Button>
            <Button 
              variant="primary" 
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              }
            >
              With Icon
            </Button>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-semibold mb-4">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Input label="Email Address" placeholder="Enter your email" type="email" />
            <Input label="Password" placeholder="Enter password" type="password" />
            <Input 
              label="With Error" 
              error="This field is required" 
              placeholder="Enter value"
            />
            <Input 
              label="Success State" 
              success 
              placeholder="Valid input"
              defaultValue="valid@email.com"
            />
            <Input 
              label="With Left Icon" 
              placeholder="Search..."
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              }
            />
            <Input 
              label="With Helper Text" 
              helperText="We'll never share your email"
              placeholder="Enter email"
            />
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hover>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  This is a default card with hover effect. Hover to see the lift animation.
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered" pattern="paisley">
              <CardHeader>
                <CardTitle>Paisley Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Card with Indian paisley pattern background.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" pattern="mandala" hover>
              <CardHeader>
                <CardTitle>Mandala Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Elevated card with mandala pattern and hover effect.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Loaders Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-semibold mb-4">Loading Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Mandala Spinner</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <MandalaSpinner size="sm" color="saffron" />
                <MandalaSpinner size="md" color="royal" />
                <MandalaSpinner size="lg" color="emerald" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paisley Loader</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <PaisleyLoader size="sm" color="saffron" />
                <PaisleyLoader size="md" color="royal" />
                <PaisleyLoader size="lg" color="gold" />
              </CardContent>
            </Card>

         
se;Showcantt Componefaulport de);
};

ex  </div>
  /div>
  
      <ction>  </se
       </div>
         rd />onCaet <Skel          ard />
  <SkeletonC          
 letonCard />   <Ske
         ">-6ls-3 gap:grid-cools-2 lg md:grid-c-1-colsid"grid grme=sNadiv clas       <d</h2>
   ton Carmb-4">Skeled ol-semibont-heading fntext-2xl foe="t classNamh2      <">
    -12sName="mbn clas <sectio}
       */rd Demo n Caeto  {/* Skel     tion>

    </secv>
             </di  </Card>
           t>
 enrdCont       </Ca/>
       ight={40} {40} heidth=rcular" wariant="citon vkele  <S            />
   thPatternwi100} ht={lar" heigt="rectanguleton varian        <Ske       "80%" />
 " width=nt="textiakeleton var      <S
          " />="textntleton varia       <Ske      
   e-y-3">me="spactent classNardCon         <Ca     >
der/CardHea           <dTitle>
   er</Caron Loadettle>Skel     <CardTi
           CardHeader>           <
     <Card>         

 rd> </Ca
           ent>dCont      </Car  >
             </div     span>
    se</ext-sm">Pule="tNam classpan     <s            g" />
 size="l" ant="pulseLoader vari<Button            >
      -2"r gaptems-centeme="flex i<div classNa            iv>
           </d   an>
      s</spm">Dottext-sclassName=" <span                 "md" />
 ts" size=iant="doarer v <ButtonLoad             >
    gap-2"center "flex items-Name= class        <div   
     </div>             /span>
   m">Spinner<me="text-sNaan class<sp               
   ze="sm" />" sinnerant="spi varittonLoader   <Bu        ">
       ter gap-2tems-cenflex isName=" clas      <div         >
 l gap-3"ex flex-co"fle=t classNamdConten     <Car      
   eader>   </CardH      tle>
     rs</CardTiton Loadee>ButTitl       <Card>
         erHeadCard       <          <Card>
