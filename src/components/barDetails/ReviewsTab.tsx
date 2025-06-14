import  { useState, useEffect } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const STAR_PATH =
  "M9.049 2.927C9.333 2.054 10.667 2.054 10.951 2.927l1.286 3.948a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.947c.284.873-.755 1.596-1.54 1.118L10 13.347l-3.356 2.792c-.785.478-1.824-.245-1.54-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.666 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.948z";

interface Review {
  _id: string;
  reviewer: string;
  comment: string;
  rating: number;
}

interface Summary {
  average: number;
  total: number;
  counts: Record<number, number>;
}

type ReviewsTabProps = {
  summary?: Summary;
  reviews: Review[];
  onAdd: (reviewer: string, comment: string, rating: number) => void;
  loading: boolean;
};

const ReviewsTab= ({
  summary,
  reviews,
  onAdd,
  loading
}:ReviewsTabProps) => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0<User>();
  const location = useLocation();

  const authName = user?.name ?? user?.nickname ?? '';

  const hasReviewed =
    isAuthenticated && reviews.some(r => r.reviewer === authName);

  const [reviewer, setReviewer] = useState<string>(authName);
  useEffect(() => {
    setReviewer(authName);
  }, [authName]);

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const labels = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>

      {/* Summary Section */}
      {summary && (
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold">
              {summary.average.toFixed(1)}
            </span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(summary.average)
                      ? 'text-amber-400'
                      : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d={STAR_PATH} />
                </svg>
              ))}
            </div>
            <span>({summary.total})</span>
          </div>

          {/* Breakdown by star count */}
          {([5, 4, 3, 2, 1] as const).map(star => {
            const count = summary.counts[star] ?? 0;
            const pct = summary.total ? (count / summary.total) * 100 : 0;
            return (
              <div key={star} className="flex items-center space-x-2">
                <span className="w-16 text-right">{labels[star - 1]}</span>
                <div className="relative flex-1 h-2 bg-gray-700 rounded">
                  <div
                    className="absolute top-0 left-0 h-2 bg-amber-400 rounded"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <p>Loading reviews…</p>
      ) : (
        reviews.map(r => (
          <Card key={r._id} className="bg-gray-800">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{r.reviewer}</CardTitle>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < r.rating ? 'text-amber-400' : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d={STAR_PATH} />
                  </svg>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{r.comment}</CardDescription>
            </CardContent>
          </Card>
        ))
      )}

      {/* Add Review Form */}
      <div className="pt-6 border-t border-gray-700 space-y-4">
        <h3 className="text-xl font-semibold">Add a Review</h3>

        {!isAuthenticated ? (
          <div className="space-y-2">
            <p>You must be logged in to leave a review.</p>
            <Button
              onClick={() =>
                loginWithRedirect({
                  appState: { returnTo: location.pathname }
                })
              }
            >
              Log in / Sign up
            </Button>
          </div>
        ) : hasReviewed ? (
          <div className="p-4 bg-gray-800 rounded">
            <p>You’ve already submitted a review. Thank you!</p>
          </div>
        ) : (
          <>
            <Input placeholder="Your name" value={reviewer} readOnly />
            <Textarea
              placeholder="Your comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 ${
                    star <= rating ? 'text-amber-400' : 'text-gray-500'
                  }`}
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                    <path d={STAR_PATH} />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-sm">{labels[rating - 1]}</span>
            </div>
            <Button
              onClick={() => onAdd(reviewer, comment, rating)}
              disabled={loading || !comment}
            >
              Submit Review
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
