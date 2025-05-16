import React, {createContext, useState, ReactNode} from 'react';

type AppContextType = {
  unit: 'celsius' | 'fahrenheit';
  toggleUnit: () => void;
  categories: string[];
  updateCategories: (cats: string[]) => void;
  location: string;
  updateLocation: (loc: string) => void;
};

export const AppContext = createContext<AppContextType>({
  unit: 'celsius',
  toggleUnit: () => {},
  categories: ['general'],
  updateCategories: () => {},
  location: 'New York',
  updateLocation: () => {},
});

type Props = {
  children: ReactNode;
};

export const AppProvider = ({children}: Props) => {
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [categories, setCategories] = useState<string[]>(['general']);
  const [location, setLocation] = useState<string>('New York');

  const toggleUnit = () => {
    setUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const updateCategories = (newCategories: string[]) => {
    setCategories(newCategories);
  };

  const updateLocation = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <AppContext.Provider
      value={{
        unit,
        toggleUnit,
        categories,
        updateCategories,
        location,
        updateLocation,
      }}>
      {children}
    </AppContext.Provider>
  );
};
