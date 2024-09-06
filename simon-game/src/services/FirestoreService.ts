import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../db/firebase';
import { Score } from '../interfaces/score-interface';

export class FirestoreService {
  private scoresCollection = collection(db, 'scores');

  async saveScore(score: Score): Promise<void> {
    try {
      await addDoc(this.scoresCollection, score);
    } catch (error) {
      console.error("Error saving score: ", error);
    }
  }

  async getHighScores(limit: number = 10): Promise<Score[]> {
    try {
      const scoresSnapshot = await getDocs(this.scoresCollection);
      const scores: Score[] = scoresSnapshot.docs.map(doc => doc.data() as Score);
      return scores.sort((a, b) => b.score - a.score).slice(0, limit);
    } catch (error) {
      console.error("Error getting scores: ", error);
      return [];
    }
  }
}
