import { useState, useEffect } from 'react';
import { Featured } from '../../components/Featured/Featured.component';
import { PhaseRow } from '../../components/PhaseRow/PhaseRow.component';
import { Phase } from '../../types';
import { Media } from '../../types';
import { callApi } from '../../utils/api';
import './Home.scss';

export const Home = () => {
  const [phases, setPhases] = useState<Array<Array<Media>>>([]);

  useEffect(() => {
    const getMedia = async () => {
      const buildParams = '?sortBy=phase'
      const data = await callApi(`/media${buildParams}`);
      return data;
    }
  
    const getPhases = async () => {
      const allMedia: Media[] = await getMedia();
      const phases: Array<Array<Media>> = [];
      allMedia.forEach(med => {
        const medPhase = med.phase-1;
        const currentPhase = phases[medPhase];
        if (currentPhase) {
          phases[medPhase].push(med);
        } else {
          phases.push([med]);
        }
      });
      
      setPhases(phases);
    }
    getPhases();
    
  }, [])

  
  return (
    <div className="App">
      <Featured />
      <div className="app-content">
        {Array(phases.length).fill(0).map((item: Phase, idx: number) => {
          const mediaForPhase: Media[] = phases[idx];
          const phase: Phase = {
            name: `Phase ${idx+1}`,
            media: mediaForPhase,
          }
          return <PhaseRow key={idx} phase={phase}/>
        })}
      </div>
    </div>
  );
}
