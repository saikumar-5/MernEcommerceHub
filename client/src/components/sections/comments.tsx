import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface Comment {
  id: number;
  name: string;
  profession: string;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export default function Comments() {
  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ["/api/comments/approved"],
  });

  if (isLoading) {
    return (
      <section id="comments" className="py-20 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">Comments</h2>
            <p className="text-gray-400">Loading comments...</p>
          </div>
        </div>
      </section>
    );
  }

  if (comments.length === 0) {
    return (
      <section id="comments" className="py-20 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">Comments</h2>
            <p className="text-gray-400 mb-8">What people are saying</p>
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-8">
              <p className="text-gray-500">No comments yet. Be the first to leave a comment!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="comments" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">Comments</h2>
          <p className="text-gray-400">What people are saying</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:border-[#00d9ff]/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {comment.name}
                  </h3>
                  <p className="text-[#00d9ff] text-sm font-medium">
                    {comment.profession}
                  </p>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30 mt-2 inline-block">
                    Verified
                  </span>
                </div>
              </div>

              <blockquote className="text-gray-300 leading-relaxed mb-4 italic">
                "{comment.comment}"
              </blockquote>

              <div className="text-xs text-gray-500">
                {format(new Date(comment.createdAt), "dd/MM/yyyy")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}