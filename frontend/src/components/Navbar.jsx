import { LogIn, Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  backgroundDesigns,
  svgPatterns,
  navbarAnimations,
  navbarStyles,
} from "../assets/dummyStyles";

import { UserButton, Show, SignInButton, useAuth } from "@clerk/react";

export default function Navbar({
  logoSrc,
  quizType = "default",
  onLogoClick = () => { },
}) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const navRef = useRef(null);
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);

  const design = backgroundDesigns[quizType] || backgroundDesigns.default;
  const pattern = svgPatterns[design.pattern] || svgPatterns.abstract;
  const { isSignedIn } = useAuth();

  // handle results click - if signed in go to results else go to login/signup
  const handleResultsClick = () => {
    if (isSignedIn) {
      navigate("/result");
    } else {
      navigate("/sign-in"); // OR modal trigger (next step)
    }

    setMenuOpen(false);
  };

  // close menu when click outside
  useEffect(() => {
    if (!menuOpen) return;

    const handleDocClick = (e) => {
      if (
        navRef.current?.contains(e.target) ||
        menuBtnRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener("click", handleDocClick, { capture: true });

    return () =>
      document.removeEventListener("click", handleDocClick, { capture: true });
  }, [menuOpen]);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className={navbarStyles.container}>
      <nav
        ref={navRef}
        className={navbarStyles.nav(design.borderColor, isHovering)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* background pattern */}
        <div className={navbarStyles.patternContainer}>
          <div
            className={navbarStyles.patternLayer}
            style={{
              backgroundImage: pattern,
              ...navbarStyles.backgroundPatternStyle,
            }}
          />
        </div>

        <div className={navbarStyles.innerContainer}>
          <div className={navbarStyles.flexContainer}>
            {/* LOGO */}
            <div className={navbarStyles.logoSection}>
              <button
                onClick={() => goTo("/")}
                className={navbarStyles.logoButton}
              >
                <img
                  src={
                    logoSrc ||
                    "https://cdn-icons-png.flaticon.com/128/5806/5806364.png"
                  }
                  alt="logo"
                  className={navbarStyles.logoImage}
                />
              </button>
            </div>
            <div className={navbarStyles.titleContainer}>
              <div className={navbarStyles.titleWrapper}>
                <div className={navbarStyles.titleBox}>
                  <h1 className={navbarStyles.titleText(design.textColor)}>
                    <span className={navbarStyles.titleGradient}>
                      Tech Quiz Master
                    </span>
                  </h1>
                </div>
              </div>
            </div>

            {/* DESKTOP BUTTONS */}
            <div className={navbarStyles.desktopButtons}>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    className={navbarStyles.buttonBase(design.accentColor)}
                  >
                    My Results
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <button
                  onClick={() => navigate("/result")}
                  className={navbarStyles.buttonBase(design.accentColor)}
                >
                  My Results
                </button>
              </Show>


              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    className={navbarStyles.buttonBase(design.accentColor)}
                  >
                    Login
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <div className="flex items-center justify-center ml-3">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9",
                      },
                    }} />
                </div>
              </Show>

              {/*  ZERO logout logic needed */}
            </div>

            {/* MOBILE MENU BTN */}
            <button
              ref={menuBtnRef}
              onClick={() => setMenuOpen((s) => !s)}
              className={`lg:hidden ${navbarStyles.mobileMenuButton(design.accentColor)}`}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div ref={menuRef} className={navbarStyles.mobileMenuWrapper}>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    className={navbarStyles.buttonBase(design.accentColor)}
                  >
                    My Results
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <button
                  onClick={() => {
                    navigate("/result");
                    setMenuOpen(false);
                  }}
                  className={navbarStyles.buttonBase(design.accentColor)}
                >
                  My Results
                </button>
              </Show>

              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    className={navbarStyles.buttonBase(design.accentColor)}
                  >
                    Login
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <UserButton  />
              </Show>
            </div>
          )}
        </div>
      </nav>
      <style>{navbarAnimations}</style>
    </div>
  );
}
