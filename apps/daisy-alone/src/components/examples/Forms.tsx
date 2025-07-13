/**
 * Forms example component.
 */

// External Modules ----------------------------------------------------------

// import clsx from "clsx";
// import Link from "next/link";

// Internal Modules ----------------------------------------------------------

import { SignInForm } from "@/components/forms/SignInForm";
import { SignOutForm } from "@/components/forms/SignOutForm";
import { SignUpForm } from "@/components/forms/SignUpForm";

// Public Objects ------------------------------------------------------------

export function Forms() {
  return (
    <div className="flex gap-8 justify-center">
      <SignInForm/>
      <SignOutForm/>
      <SignUpForm/>
    </div>
  );
}

// Private Objects -----------------------------------------------------------

/*
function SignInForm() {

  return (
    <div className="card bg-info/50 border-2 rounded-2xl w-96">
      <div className="card-body">

        <span className="card-title">Sign In</span>
        <span className="card-actions justify-end">
          <Link className="link" href="#">Sign Up</Link>
        </span>
        <form>

          <div className="fieldset">
            <label className="fieldset-legend" htmlFor="email">Email Address</label>
            <input
              className="input w-full"
              id="email"
              placeholder="Enter your email"
              type="text"
            />
            <p className="text-error">(Error message)</p>
          </div>

          <span className="card-actions justify-end">
            <Link className="link" href="#">Forgot your password?</Link>
          </span>
          <div className="fieldset">
            <label className="fieldset-legend" htmlFor="password">Password</label>
            <input
              className="input w-full"
              id="password"
              placeholder="Enter your password"
              type="password"
            />
            <p className="text-error">(Error message)</p>
          </div>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>

        </form>
      </div>
    </div>
  )

}
*/

/*
function SignUpForm() {

  return (
    <div className="card bg-info/50 border-2 rounded-2xl w-128">
      <div className="card-body">
        <span className="card-title">Sign Up</span>
        <form>

          <div className="fieldset">
            <label className="fieldset-legend" htmlFor="email">Email Address</label>
            <input
              className="input w-full"
              id="email"
              placeholder="Enter your email"
              type="text"
            />
            <p className="text-error">(Error message)</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="fieldset">
              <label className="fieldset-legend" htmlFor="firstName">First Name</label>
              <input
                className="input w-full"
                id="firstName"
                placeholder="Enter your first name"
                type="text"
              />
              <p className="text-error">(Error message)</p>
            </div>
            <div className="fieldset">
              <label className="fieldset-legend" htmlFor="lastName">Last Name</label>
              <input
                className="input w-full"
                id="lastName"
                placeholder="Enter your last name"
                type="text"
              />
              <p className="text-error">(Error message)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="fieldset">
              <label className="fieldset-legend" htmlFor="password">Password</label>
              <input
                className="input"
                id="password"
                placeholder="Enter your password"
                type="password"
              />
              <p className="text-error">(Error message)</p>
            </div>
            <div className="fieldset">
              <label className="fieldset-legend" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="input"
                id="password"
                placeholder="Confirm your password"
                type="password"
              />
              <p className="text-error">(Error message)</p>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>

        </form>
      </div>
    </div>
  )

}
*/
