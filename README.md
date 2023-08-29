This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Project Reflection

- Did you run into any “gotchas” along the way? If so, what were
they and how did you address them?

    *    Pass the token without exposing it in the browser. I set a cookie with the token and recovered it on the server side.

- How did you handle forms? In a largely form-driven project, would
you do anything differently? If so, what?
      * I would create a component with like BaseInput  in that  component I`ll cover                   handling the errors, accessibility  and be able to customize the validations

- How did you handle authorization? In your ideal FE/BE scenario,
what auth strategy would you use?

  * I used a cookie to pass  the token from the client side to the server side, also After doing login the requests to the api I did in the server side using ServerSideProps  method

- Is there anything you’d like to share about your project prior to
my evaluating it?
    * I would like to do more stuff to improve the user experience, actually that is the reason I implemented an Infiniti scroll instead of the paginator for the appoints view.
Also was really fun to do this assessment because I believe this is the best way for to developers show their skills but no is the best piece of code I made.

- How long did you spend on this exercise? If you had unlimited
more time to spend on this, how would you spend it and how would
you prioritize each item?
    * I would invest more time to make a better structure of the project.
Also, I think more about the scalability of the project and make components be more reusable.
I`ll create a better interface for the user more attractive with a better experience

Note : How am I supposed to prove myself a hero if nobody will give a chance? *HERCULES*
