using System;
using System.Diagnostics;
using System.IO;

class Program
{
    [STAThread]
    static void Main()
    {
        string url = "https://qiqiqi2026.github.io/zsb-coach/app.html";
        string[] candidates = new string[] {
            @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
            @"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
            @"C:\Program Files\Google\Chrome\Application\chrome.exe",
            @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
        };
        string browser = null;
        foreach (string c in candidates)
        {
            if (File.Exists(c)) { browser = c; break; }
        }
        if (browser != null)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = browser,
                Arguments = "--app=" + url + " --window-size=1280,860",
                UseShellExecute = false
            });
        }
        else
        {
            Process.Start(url);
        }
    }
}
