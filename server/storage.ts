import { 
  users, projects, comments, contacts, experiences, analytics,
  type User, type InsertUser,
  type Project, type InsertProject,
  type Comment, type InsertComment,
  type Contact, type InsertContact,
  type Experience, type InsertExperience,
  type Analytics
} from "@shared/schema";
import { db } from './db';

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  likeProject(id: number): Promise<Project | undefined>;

  // Comments
  getAllComments(): Promise<Comment[]>;
  getApprovedComments(): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  approveComment(id: number): Promise<Comment | undefined>;
  deleteComment(id: number): Promise<boolean>;
  likeComment(id: number): Promise<Comment | undefined>;

  // Contacts
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<boolean>;

  // Experiences
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;

  // Analytics
  getAnalytics(): Promise<Analytics>;
  updateAnalytics(analytics: Partial<Analytics>): Promise<Analytics>;
  incrementVisitors(): Promise<Analytics>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private comments: Map<number, Comment>;
  private contacts: Map<number, Contact>;
  private experiences: Map<number, Experience>;
  private analytics: Analytics;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.comments = new Map();
    this.contacts = new Map();
    this.experiences = new Map();
    this.currentId = 1;
    
    // Initialize analytics
    this.analytics = {
      id: 1,
      totalVisitors: 1247,
      totalComments: 89,
      totalContacts: 24,
      totalLikes: 341,
      updatedAt: new Date(),
    };

    this.initializeData();
  }

  private initializeData() {
    // Initialize sample projects
    const sampleProjects: Project[] = [
      {
        id: this.currentId++,
        title: "E-Commerce Platform",
        description: "Full-stack MERN application with payment integration, admin dashboard, and real-time inventory management.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
        githubUrl: "https://github.com/saikumar/ecommerce",
        liveUrl: "https://ecommerce-demo.com",
        category: "fullstack",
        likes: 24,
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      },
      {
        id: this.currentId++,
        title: "Task Management App",
        description: "React-based project management tool with drag-and-drop functionality and team collaboration features.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
        githubUrl: "https://github.com/saikumar/task-manager",
        liveUrl: "https://task-manager-demo.com",
        category: "frontend",
        likes: 18,
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 4 months ago
      },
      {
        id: this.currentId++,
        title: "RESTful API Service",
        description: "Scalable Node.js API with authentication, rate limiting, and comprehensive documentation.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Express", "MongoDB", "JWT", "Swagger"],
        githubUrl: "https://github.com/saikumar/api-service",
        liveUrl: null,
        category: "backend",
        likes: 31,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
      },
    ];

    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });

    // Initialize sample experiences
    const sampleExperiences: Experience[] = [
      {
        id: this.currentId++,
        position: "Full Stack Web Developer",
        company: "Innodetrics - GenAI | Data Science | BI",
        description: "Working on advanced web development projects with focus on GenAI integration and data science applications.",
        technologies: ["React", "Node.js", "Python", "GenAI"],
        startDate: "June 2025",
        endDate: null,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        position: "Cyber Security Tool Developer", 
        company: "Durbhasi Gurukulam",
        description: "Building a live IPS tool using FaithSkin and Rust programming language. Gaining hands-on experience in network security, intrusion detection, and static malware analysis.",
        technologies: ["Rust", "FaithSkin", "Network Security", "IPS"],
        startDate: "April 2025",
        endDate: null,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        position: "Research Assistant",
        company: "BML Munjal University",
        description: "Conducting research on heterogeneous nano-mechanical behavior of vehicle gear materials using Python data analysis and machine learning techniques.",
        technologies: ["Python", "Data Analysis", "Machine Learning", "Research"],
        startDate: "August 2024",
        endDate: null,
        createdAt: new Date(),
      },
    ];

    sampleExperiences.forEach(experience => {
      this.experiences.set(experience.id, experience);
    });

    // Initialize sample comments (approved)
    const sampleComments: Comment[] = [
      {
        id: this.currentId++,
        name: "Jane Smith",
        email: "jane@example.com",
        profession: "Software Engineer",
        comment: "Amazing portfolio! The design is clean and the projects showcase impressive technical skills. Looking forward to seeing more of your work.",
        likes: 5,
        isApproved: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        id: this.currentId++,
        name: "Mike Davis",
        email: "mike@example.com",
        profession: "Full Stack Developer",
        comment: "Solid MERN stack implementation. The attention to detail in the UI/UX design is impressive. Would love to collaborate on a project!",
        likes: 12,
        isApproved: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      },
      {
        id: this.currentId++,
        name: "Anna Lee",
        email: "anna@example.com",
        profession: "UX Designer",
        comment: "Great work on the responsive design! The portfolio looks fantastic on mobile devices. Keep up the excellent work!",
        likes: 8,
        isApproved: true,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      },
    ];

    sampleComments.forEach(comment => {
      this.comments.set(comment.id, comment);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = {
      id,
      title: insertProject.title,
      description: insertProject.description,
      imageUrl: insertProject.imageUrl,
      technologies: insertProject.technologies,
      githubUrl: insertProject.githubUrl || null,
      liveUrl: insertProject.liveUrl || null,
      category: insertProject.category,
      likes: 0,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async likeProject(id: number): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, likes: project.likes + 1 };
    this.projects.set(id, updatedProject);
    
    // Update analytics
    this.analytics.totalLikes += 1;
    
    return updatedProject;
  }

  // Comments
  async getAllComments(): Promise<Comment[]> {
    return Array.from(this.comments.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getApprovedComments(): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.isApproved)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentId++;
    const comment: Comment = {
      id,
      name: insertComment.name,
      email: insertComment.email,
      profession: insertComment.profession || null,
      comment: insertComment.comment,
      likes: 0,
      isApproved: false,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    
    // Update analytics
    this.analytics.totalComments += 1;
    
    return comment;
  }

  async approveComment(id: number): Promise<Comment | undefined> {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    
    const updatedComment = { ...comment, isApproved: true };
    this.comments.set(id, updatedComment);
    return updatedComment;
  }

  async deleteComment(id: number): Promise<boolean> {
    const comment = this.comments.get(id);
    if (comment) {
      this.analytics.totalComments -= 1;
      this.analytics.totalLikes -= comment.likes;
    }
    return this.comments.delete(id);
  }

  async likeComment(id: number): Promise<Comment | undefined> {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    
    const updatedComment = { ...comment, likes: comment.likes + 1 };
    this.comments.set(id, updatedComment);
    
    // Update analytics
    this.analytics.totalLikes += 1;
    
    return updatedComment;
  }

  // Contacts
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = {
      ...insertContact,
      id,
      isRead: false,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    
    // Update analytics
    this.analytics.totalContacts += 1;
    
    return contact;
  }

  async markContactAsRead(id: number): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;
    
    const updatedContact = { ...contact, isRead: true };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  async deleteContact(id: number): Promise<boolean> {
    const contact = this.contacts.get(id);
    if (contact) {
      this.analytics.totalContacts -= 1;
    }
    return this.contacts.delete(id);
  }

  // Experiences
  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).sort((a, b) => {
      // Sort by start date descending (most recent first)
      const aYear = parseInt(b.startDate);
      const bYear = parseInt(a.startDate);
      return aYear - bYear;
    });
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = this.currentId++;
    const experience: Experience = {
      id,
      position: insertExperience.position,
      company: insertExperience.company,
      description: insertExperience.description,
      technologies: insertExperience.technologies,
      startDate: insertExperience.startDate,
      endDate: insertExperience.endDate || null,
      createdAt: new Date(),
    };
    this.experiences.set(id, experience);
    return experience;
  }

  async updateExperience(id: number, updates: Partial<InsertExperience>): Promise<Experience | undefined> {
    const experience = this.experiences.get(id);
    if (!experience) return undefined;
    
    const updatedExperience = { ...experience, ...updates };
    this.experiences.set(id, updatedExperience);
    return updatedExperience;
  }

  async deleteExperience(id: number): Promise<boolean> {
    return this.experiences.delete(id);
  }

  // Analytics
  async getAnalytics(): Promise<Analytics> {
    return this.analytics;
  }

  async updateAnalytics(updates: Partial<Analytics>): Promise<Analytics> {
    this.analytics = { ...this.analytics, ...updates, updatedAt: new Date() };
    return this.analytics;
  }

  async incrementVisitors(): Promise<Analytics> {
    this.analytics.totalVisitors += 1;
    this.analytics.updatedAt = new Date();
    return this.analytics;
  }
}

class DbStorage implements IStorage {
  private mem = new MemStorage();

  // Contacts
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  // Delegate all other methods to MemStorage for now
  getUser = this.mem.getUser.bind(this.mem);
  getUserByUsername = this.mem.getUserByUsername.bind(this.mem);
  createUser = this.mem.createUser.bind(this.mem);
  getAllProjects = this.mem.getAllProjects.bind(this.mem);
  getProjectsByCategory = this.mem.getProjectsByCategory.bind(this.mem);
  createProject = this.mem.createProject.bind(this.mem);
  updateProject = this.mem.updateProject.bind(this.mem);
  deleteProject = this.mem.deleteProject.bind(this.mem);
  likeProject = this.mem.likeProject.bind(this.mem);
  getAllComments = this.mem.getAllComments.bind(this.mem);
  getApprovedComments = this.mem.getApprovedComments.bind(this.mem);
  createComment = this.mem.createComment.bind(this.mem);
  approveComment = this.mem.approveComment.bind(this.mem);
  deleteComment = this.mem.deleteComment.bind(this.mem);
  likeComment = this.mem.likeComment.bind(this.mem);
  markContactAsRead = this.mem.markContactAsRead.bind(this.mem);
  deleteContact = this.mem.deleteContact.bind(this.mem);
  getAllExperiences = this.mem.getAllExperiences.bind(this.mem);
  createExperience = this.mem.createExperience.bind(this.mem);
  updateExperience = this.mem.updateExperience.bind(this.mem);
  deleteExperience = this.mem.deleteExperience.bind(this.mem);
  getAnalytics = this.mem.getAnalytics.bind(this.mem);
  updateAnalytics = this.mem.updateAnalytics.bind(this.mem);
  incrementVisitors = this.mem.incrementVisitors.bind(this.mem);
}

export const storage = new DbStorage();
