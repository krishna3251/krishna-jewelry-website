export default function LuxuryLoader({ onComplete }: { onComplete?: () => void }) {
  onComplete?.();
  return null;
}
