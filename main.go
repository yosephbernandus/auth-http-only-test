package main

import (
	"html/template"
	"log"
	"net/http"
)

func main() {
	// Serve static files
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Route handlers
	http.HandleFunc("/", handleLogin)
	http.HandleFunc("/dashboard", handleDashboard)

	log.Println("Server starting on :3000...")
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		tmpl := template.Must(template.ParseFiles("templates/login.html"))
		tmpl.Execute(w, nil)
		return
	}
}

func handleDashboard(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/dashboard.html"))
	tmpl.Execute(w, nil)
}
