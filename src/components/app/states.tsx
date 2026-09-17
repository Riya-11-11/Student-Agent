import { AlertCircle, LoaderCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingState({ message }: { message: string }) { return <div className="state-panel" role="status"><div className="loading-orbit"><LoaderCircle className="animate-spin" /></div><h3>{message}</h3><div className="skeleton-lines"><span /><span /><span /></div></div>; }
export function EmptyState({ title, description }: { title: string; description: string }) { return <div className="state-panel"><div className="state-icon"><Sparkles /></div><h3>{title}</h3><p>{description}</p></div>; }
export function ErrorState({ retry }: { retry: () => void }) { return <div className="state-panel"><div className="state-icon error"><AlertCircle /></div><h3>Something went wrong.</h3><p>Please try again.</p><Button variant="outline" onClick={retry}>Retry</Button></div>; }
