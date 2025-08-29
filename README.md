# Ministry of Justice Template Repository

[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/template-repository/badge)](https://github-community.service.justice.gov.uk/repository-standards/template-repository)

# LAA Data Stewardship OpenAPI Workbench

This repository is a shared space for LAA teams to **design**, **experiment**, and **explore** OpenAPI endpoint definitions, schemas, and related documentation.  
It’s intended as a collaborative sandbox where you can try out ideas before integrating them into production services.

---

## 📌 Local Development

The **fastest** way to view changes is to open the `index.html` file directly in your browser:  
[docs/index.html](./docs/index.html)

Simply open the file, and Swagger UI will render your OpenAPI YAML file — no server required.

---

## 🐳 Using Docker

Docker is available for hosting/building in a namespace, but you can also run it locally.

From the repository root:
```bash
cd scripts
./serve-docs.sh
```
This will execute the build and run commands to serve the docs via Docker.

Once running, open [http://localhost:8080](http://localhost:8080) in your browser to view the Swagger UI.

---

## 🛠 Where to Make Changes

1. Locate your **team's directory** inside `openapi/` (e.g., `openapi/laa-cse`).
2. Add or update your service's OpenAPI YAML file there.
3. Update `docs/index.html` to reference your YAML file if needed.

Example:
```
openapi/
  laa-cse/
    my-service.yaml
```

---

## 🔧 Useful Tools

You can quickly design and experiment with OpenAPI YAML files using the Swagger Editor:  
🌐 [https://editor.swagger.io/](https://editor.swagger.io/)

Paste your spec into the editor, make changes, and preview the API in real time before committing it here.

---

## 📂 Repository Structure

```
openapi-prototype-repo/
├── docs/                  # Swagger UI front-end
│   └── index.html
├── openapi/               # Team-specific OpenAPI YAML specs
│   ├── laa-cse/
│   └── ...
├── scripts/               # Helper scripts (e.g., serve-docs.sh)
├── Dockerfile             # Docker config for serving docs
├── docker-compose.yml
└── README.md
```

---

