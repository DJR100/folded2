import { User } from "@folded/types";
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "@react-native-firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "@react-native-firebase/firestore";
import _ from "lodash";
import {
  type PropsWithChildren,
  createContext,
  use,
  useEffect,
  useState,
} from "react";

import { app, db } from "@/lib/firebase";

export const auth = initializeAuth(app);

interface AuthContext {
  user: User | null | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  onboarding: number | "DONE";
  setOnboarding: React.Dispatch<React.SetStateAction<number | "DONE">>;
  postOnboarding: 0 | 1 | 2 | 3 | "DONE";
  setPostOnboarding: React.Dispatch<
    React.SetStateAction<0 | 1 | 2 | 3 | "DONE">
  >;
  bankConnected: boolean;
  setBankConnected: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (dotkey: string, value: any) => Promise<void>;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>();

  // TODO: Init onboarded and tier state from the database
  const [onboarding, setOnboarding] = useState<number | "DONE">(0);
  const [postOnboarding, setPostOnboarding] = useState<0 | 1 | 2 | 3 | "DONE">(
    0,
  );
  const [bankConnected, setBankConnected] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutFirebase(auth);

      // Reset all state
      setUser(null);
      setOnboarding(0);
      setPostOnboarding(0);
      setBankConnected(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const readUser = async () => {
      if (!auth.currentUser?.uid) return;

      const user = (
        await getDoc(doc(db, "users", auth.currentUser?.uid))
      ).data() as User | undefined;

      return user;
    };
    // auth.authStateReady().then(async () => {
    //   setUser(await readUser());
    // });
    const unsubscribeAuthState = auth.onAuthStateChanged(async () => {
      setUser(await readUser());
    });

    return () => {
      unsubscribeAuthState();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const snapshotListener = onSnapshot(
      doc(db, "users", auth.currentUser?.uid ?? ""),
      (doc) => {
        const user = doc.data() as User | undefined;
        if (!user) return;
        setUser(user);
      },
    );
    return () => {
      snapshotListener();
    };
  }, [!!user]);

  const updateUser = async (dotkey: string, value: any) => {
    // dotkey is like "demographic.age"
    if (!user) return;

    const keys = dotkey.split(".");
    const newUser = _.cloneDeep(user);
    let current = newUser; // Use newUser instead of making a second clone
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i] as keyof typeof current;
      if (!current[k]) {
        // @ts-expect-error Expected typescript error
        current[k] = {} as any;
      }
      current = current[k] as any;
    }
    const lastKey = keys[keys.length - 1] as keyof typeof current;
    // @ts-expect-error Expected typescript error
    current[lastKey] = value as any;

    setUser(newUser);

    await setDoc(doc(db, "users", user.uid), newUser);
  };

  const value: AuthContext = {
    user,
    signIn,
    signUp,
    signOut,
    isLoading: user === undefined,
    onboarding,
    setOnboarding,
    postOnboarding,
    setPostOnboarding,
    bankConnected,
    setBankConnected,
    updateUser,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuthContext() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error(
      "useAuthContext must be wrapped in a <AuthContextProvider />",
    );
  }
  return value;
}
