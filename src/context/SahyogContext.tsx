import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { SEED_CHALLENGES } from '../data/ranchiDatasets';

export type ChallengeStatus = 'Submitted' | 'Validated' | 'Assigned' | 'In Progress' | 'Completed';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  district: string;
  status: ChallengeStatus;
  imageUrl?: string;
  industryFunded?: boolean;
  industryPartner?: string;
  milestoneIndex?: number;
  ai_analysis?: {
    domain: string;
    keywords: string[];
    priority: string;
    duplicate_flag: boolean;
    recommended_uni: string;
    match_reason: string;
    duplicate_count?: number;
    merged_reports?: string[];
    uni_pov_reason?: string;
  };
}

interface SahyogContextType {
  challenges: Challenge[];
  addChallenge: (challenge: Omit<Challenge, 'id'>) => void;
  updateChallengeStatus: (id: string, status: ChallengeStatus) => void;
  updateChallengeMilestone: (id: string, milestoneIndex: number) => void;
  fundChallenge: (id: string, partner: string) => void;
  seedDatabase: () => Promise<void>;
}

const SahyogContext = createContext<SahyogContextType | undefined>(undefined);

export const SahyogProvider = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'challenges'), (snapshot) => {
      const challengesData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Challenge[];
      
      setChallenges(challengesData);
    }, (error) => {
      console.error("Error listening to challenges: ", error);
    });

    return () => unsubscribe();
  }, []);

  const addChallenge = async (challenge: Omit<Challenge, 'id'>) => {
    try {
      await addDoc(collection(db, 'challenges'), challenge);
    } catch (e) {
      console.error("Error adding challenge: ", e);
    }
  };

  const updateChallengeStatus = async (id: string, status: ChallengeStatus) => {
    try {
      await updateDoc(doc(db, 'challenges', id), { status });
    } catch (e) {
      console.error("Error updating challenge status: ", e);
    }
  };

  const updateChallengeMilestone = async (id: string, milestoneIndex: number) => {
    try {
      const updateData: any = { milestoneIndex };
      if (milestoneIndex === 5) {
        updateData.status = 'Completed';
      } else {
        updateData.status = 'In Progress';
      }
      
      await updateDoc(doc(db, 'challenges', id), updateData);
    } catch (e) {
      console.error("Error updating challenge milestone: ", e);
    }
  };

  const fundChallenge = async (id: string, partner: string) => {
    try {
      await updateDoc(doc(db, 'challenges', id), { 
        industryFunded: true, 
        industryPartner: partner 
      });
    } catch (e) {
      console.error("Error funding challenge: ", e);
    }
  };

  const seedDatabase = async () => {
    try {
      const batch = writeBatch(db);
      SEED_CHALLENGES.forEach(challenge => {
        const docRef = doc(db, 'challenges', challenge.id);
        batch.set(docRef, challenge);
      });
      await batch.commit();
      console.log('Database seeded!');
    } catch (e) {
      console.error("Error seeding database: ", e);
    }
  };

  return (
    <SahyogContext.Provider value={{ challenges, addChallenge, updateChallengeStatus, updateChallengeMilestone, fundChallenge, seedDatabase }}>
      {children}
    </SahyogContext.Provider>
  );
};

export const useSahyog = () => {
  const context = useContext(SahyogContext);
  if (context === undefined) {
    throw new Error('useSahyog must be used within a SahyogProvider');
  }
  return context;
};
