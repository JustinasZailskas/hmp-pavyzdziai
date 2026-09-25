import React from 'react';

import VairuotojuSectionList from './components/VairuotojuSectionList';
import vairuotojaiPagalSezonus from './data/vairuotojaiPagalSezonus';

export default function App() {
  return <VairuotojuSectionList sekcijos={vairuotojaiPagalSezonus} />;
}
