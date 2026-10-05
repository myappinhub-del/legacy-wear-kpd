import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Star,
  Navigation,
  Bookmark,
  Share2,
  Smartphone,
  CheckCircle,
  ThumbsUp,
  MessageCircle,
  Send
} from 'lucide-react';
import { SiteConfig, StoreReview } from '../types';

interface StoreLocationReviewsProps {
  config: SiteConfig;
  reviews: StoreReview[];
  onAddReview: (review: StoreReview) => void;
}

export const StoreLocationReviews: React.FC<StoreLocationReviewsProps> = ({
  config,
  reviews,
  onAddReview
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: StoreReview = {
      id: 'rev-' + Date.now(),
      author: author.trim(),
      rating,
      date: 'Just now',
      comment: comment.trim(),
      reviewsCount: '1 review',
      source: 'Verified Buyer'
    };

    onAddReview(newRev);
    setAuthor('');
    setComment('');
    setShowReviewModal(false);
  };

  return (
    <section id="about" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Store Location & Google Maps Profile Header */}
      <div className="rounded-3xl bg-[#11131b] border border-[#232636] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Store Info from Prompt */}
          <div className="lg:col-span-6 p-6 sm:p-10 text-left flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[11px] font-bold text-black bg-[#d4af37] rounded uppercase tracking-wider">
                  Verified Physical Store
                </span>
                <span className="text-xs text-zinc-400">Clothing store</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
                Legacy wear
              </h3>

              {/* 5.0 Star Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-[#1a1c26] border border-[#2e3247] px-2.5 py-1 rounded-lg">
                  <span className="text-base font-bold text-[#d4af37]">5.0</span>
                  <div className="flex items-center text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-zinc-400">({reviews.length} reviews)</span>
              </div>

              {/* Address details exactly from user prompt */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{config.address}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Plus Code: {config.plusCode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-rose-400 font-semibold">{config.timing}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">Walk-in or Online Delivery</span>
                </div>
              </div>

              {/* Action Buttons: Directions, Save, Send to phone, Share */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    config.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs hover:opacity-95 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </a>

                <button
                  onClick={() => alert('Legacy Wear saved to your favorites!')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700 hover:border-zinc-500 transition"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Save
                </button>

                <a
                  href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700 hover:border-zinc-500 transition"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Call Store
                </a>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700 hover:border-zinc-500 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedLink ? 'Copied!' : 'Share'}
                </button>
              </div>
            </div>

            {/* Google review summary bar */}
            <div className="p-4 rounded-2xl bg-[#171924] border border-[#272a3b] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Google Review Summary</span>
                <span className="text-[#d4af37]">5.0 / 5.0</span>
              </div>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2 text-[10px] text-zinc-400">
                    <span className="w-2">{stars}</span>
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#d4af37] rounded-full"
                        style={{ width: stars === 5 ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Map & Storefront Graphic */}
          <div className="lg:col-span-6 relative min-h-[320px] bg-zinc-950 flex flex-col justify-center items-center p-6 border-t lg:border-t-0 lg:border-l border-[#232636]">
            {/* Visual Store Map Card */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-zinc-800 relative flex flex-col justify-between p-6 bg-gradient-to-br from-[#151722] to-[#0c0d12]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-zinc-300">Live Location • Karempudi</span>
                </div>
                <span className="text-[11px] text-[#d4af37] font-mono">CPGC+HQ</span>
              </div>

              {/* Stylized pin showcase */}
              <div className="my-8 text-center space-y-2">
                <div className="inline-flex p-4 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.3)] animate-bounce">
                  <MapPin className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className="text-lg font-cinzel font-bold text-white">LEGACY WEAR STORE</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Vinukonda - Karempudi Road, Guntur District, Andhra Pradesh
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-xs text-zinc-400">
                <span>Free in-store pickup available</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    config.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#d4af37] font-semibold hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Customer Reviews Section - specifically featuring Challa Venkata ramaiah & Mohammad Shavali */}
        <div className="p-6 sm:p-10 border-t border-[#232636] bg-[#0d0e14] text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-lg sm:text-xl font-cinzel font-bold text-white tracking-wide">
                Customer Reviews & Ratings
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Authentic feedback from Google Maps and verified buyers
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e2bd44] text-black font-bold text-xs uppercase tracking-wider transition self-start sm:self-auto"
            >
              <MessageCircle className="w-4 h-4" />
              Write a Review
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl p-5 bg-[#141620] border border-[#242738] flex flex-col justify-between space-y-4 hover:border-zinc-700 transition"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">{rev.author}</span>
                        {rev.source === 'Verified Buyer' && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        {rev.reviewsCount || '1 review'} • {rev.date}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {rev.source}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-[#d4af37] mt-2">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < Math.round(rev.rating) ? 'fill-current' : 'text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2 border-t border-zinc-800/80">
                  <button
                    onClick={() => alert('Thanks for the like!')}
                    className="flex items-center gap-1 hover:text-[#d4af37] transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Like</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 hover:text-[#d4af37] transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#13151f] border border-[#2c3045] rounded-3xl p-6 text-left shadow-2xl">
            <h4 className="text-lg font-cinzel font-bold text-white">Write a Review for Legacy Wear</h4>
            <p className="text-xs text-zinc-400 mt-1">Share your experience with Karempudi store & online delivery.</p>

            <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-[#d4af37]"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-zinc-600'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Review</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the fabric quality, fitting, and service..."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
