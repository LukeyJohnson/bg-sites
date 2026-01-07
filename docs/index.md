# Capability Platform

Welcome to the capability documentation.

??? note "Authentication (Click to Open)"
    We use OAuth2 for all secure transactions.
    
    * **Endpoint:** `/api/v1/auth`
    * **Method:** POST

??? note "Billing System"
    The billing system is integrated with Stripe.
    
    ```json
    {
      "customer_id": "12345",
      "status": "active"
    }
    ```

## Deployment
Deployment is handled via CI/CD pipelines using GitHub Actions.
