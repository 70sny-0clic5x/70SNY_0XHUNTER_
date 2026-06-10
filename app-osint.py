from flask import Flask, render_template, request, jsonify
from flask import Response
from playwright.sync_api import sync_playwright
import re 
import requests
import random
import time
import os
import json


base_dir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, 
            static_folder=os.path.join(base_dir, 'static'),
            template_folder=os.path.join(base_dir, 'templates'))


USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1"
]

#
def tor_request(url):
    proxies = {
        'http': 'socks5h://127.0.0.1:9150',
        'https': 'socks5h://127.0.0.1:9150'
    }
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        response = requests.get(url, proxies=proxies, headers=headers, timeout=30)
        return response.text
    except:
        return None

def test_tor_connection():
    proxy_server = "socks5h://127.0.0.1:9150" 
    with sync_playwright() as p:
        print("🚀 Starting Browser with Tor Proxy...")
        browser = p.chromium.launch(
            headless=True, 
            proxy={"server": proxy_server}
        )
        context = browser.new_context(
            user_agent=random.choice(USER_AGENTS)
        )
        page = context.new_page()
        try:
            print("🔗 Checking connection to Tor network...")
            page.goto("https://check.torproject.org", timeout=60000)
            if "Congratulations" in page.content():
                print("✅ Success! You are now connected to Tor.")
                print(f"🌍 Your Hidden IP: {page.locator('strong').inner_text()}")
            else:
                print("❌ Something went wrong. You are NOT using Tor.")
        except Exception as e:
            print(f"⚠️ Connection Error: {e}")
            print("Make sure Tor Browser is OPEN in the background!")
        time.sleep(5) 
        browser.close()

TARGET_ONION_SITES = {
    "Torch_Proxy": {
        "url": "https://xmh57jrknzkhv6y3ls3ubv6iwobqzlcic7eusemxp2767z2f7thsciad.onion.ly",
        "search_path": "/search?q={query}",
        "selector": ".result",
        "type": "Proxy Search"
    },
    "OnionSearch_Lib": {
        "url": "https://onionsearch.org",
        "search_path": "/search?q={query}",
        "selector": ".search-result",
        "type": "Proxy Search"
    },
    "Dread_Forum": {
        "url": "https://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion",
        "search_path": "/search/?q={query}&author=&sub=all&sort=best",
        "selector": ".post-container" 
    },
    "PirateBay_Onion": {
        "url": "http://piratebayo3klnzokct3wt5yyxb2vpebbuyjl7m623iaxmqhsd52coid.onion",
        "search_path": "/search.php?q={query}&all=on&search=Pirate+Search&page=0&orderby=",
        "selector": "#searchResult" 
    },
    "Infiltrators_Search": {
        "url": "http://i4pd4zpyhrojnyx5l3d2siauy4almteocqow4bp2lqxyocrfy6prycad.onion",
        "search_path": "/infiltrators/#search={query}",
        "selector": ".result-item" 
    },
    "EarsAndEyes_Search": {
        "url": "http://i4pd4zpyhrojnyx5l3d2siauy4almteocqow4bp2lqxyocrfy6prycad.onion",
        "search_path": "/earsandeyes/#search={query}",
        "selector": ".entry" 
    },
    "Resources_Search": {
        "url": "http://i4pd4zpyhrojnyx5l3d2siauy4almteocqow4bp2lqxyocrfy6prycad.onion",
        "search_path": "/resources/#search={query}",
        "selector": ".resource-link"
    },
    "Ransom_Archive": {
        "url": "http://wgq3bd2kqoybhstp77i3wrzbfnsyd27wt34psaja4grqiezqircorkyd.onion", 
        "search_path": None, 
        "selector": "a", 
        "mode": "crawl" 
    },
    "Excavator_Search": {
        "url": "http://xjfbpuj56rdazx4iolylxplbvyft2onuerjeimlcqwaihp3s6r4xebqd.onion",
        "search_path": "/?s={query}",
        "selector": ".result-title, h3 a" 
    },
    "Tor_Relay_Stats": {
        "url": "http://hctxrvjzfpvmzh2jllqhgvvkoepxb4kfzdjm6h7egcwlumggtktiftid.onion/userstats-relay-country.html",
        "search_path": None, 
        "selector": "table, tr, td", 
        "mode": "crawl"
    },
    "Tor_Metrics_News": {
        "url": "http://hctxrvjzfpvmzh2jllqhgvvkoepxb4kfzdjm6h7egcwlumggtktiftid.onion/news.html",
        "search_path": None, 
        "selector": "p, li, a", 
        "mode": "crawl"
    },
    "Specialized_Forum_Search": {
        "url": "http://w4ljqtyjnxinknz4hszn4bsof7zhfy5z2h4srfss4vvkoikiwz36o3id.onion",
        "search_path": "/search.php?keywords={query}&action=do_search&forums%5B%5D=19&postthread=1",
        "selector": ".threadbit, .post_content" 
    },
    "Omega_Search": {
        "url": "http://kfgw55ndxkdnxu42cntbm3fd7tthrxgruq4bewaxhc7iytysetmreuyd.onion",
        "search_path": "/cgi-bin/omega/omega?P={query}",
        "selector": ".results, .p" 
    },
    "XenForum_Latest_Leaks": {
        "url": "http://bbzzzsvqcrqtki6umym6itiixfhni37ybtt7mkbjyxn2pgllzxf2qgyd.onion",
        "search_path": "/search/search?q={query}&o=date", 
        "selector": ".structItem--thread" 
    },
    "Excavator_Directory": {
        "url": "http://enxx3byspwsdo446jujc52ucy2pf5urdbhqw3kbsfhlfjwmbpj5smdad.onion/",
        "search_path": None, 
        "selector": "a, li", 
        "mode": "crawl"
    },
    "KiwiFarms_Archive": {
        "url": "http://kiwifarmsaaf4t2h7gc3dfc5ojhmqruw2nit3uejrpiagrxeuxiyxcyd.onion",
        "search_path": "/search/search?q={query}&o=date",
        "selector": ".structItem-title, .post-article"
    },
    "Ramble_Forum": {
        "url": "http://rambleeeqrhty6s5jgefdfdtc6tfgg4jj6svr4jpgk4wjtg3qshwbaad.onion",
        "search_path": "/search?q={query}",
        "selector": ".post-wrapper, .article-card" 
    },
    "Pitch_Platform": {
        "url": "http://pitchprash4aqilfr7sbmuwve3pnkpylqwxjbj2q5o4szcfeea6d27yd.onion",
        "search_path": "/search?q={query}&s=posts",
        "selector": ".search-result, .post-container" 
    },
    "CyberHome_Search": {
        "url": "http://x4ijfwy76n6jl7rs4qyhe6qi5rv6xyuos3kaczgjpjcajigjzk3k7wqd.onion",
        "search_path": "/search?sterm={query}",
        "selector": ".result-link, a" 
    },
     "Ransomware_Live": {
        "url": "https://www.ransomware.live",
        "search_path": "/search?q={query}&scope=all",
        "selector": ".table, .card-body", 
        "type": "ClearWeb"
    },
}

def scrape_ahmia_onion(query, page_instance):
    results = []
    ahmia_url = f"https://ahmia.fi/search/?q={query}"
    
    try:
        page_instance.bring_to_front()
        page_instance.goto(ahmia_url, timeout=90000, wait_until='load')
        
        page_instance.wait_for_selector('a, li.result', timeout=30000)
        
        search_items = page_instance.locator('li.result').all()
        for item in search_items:
            try:
               title = (item.locator('h4').inner_text() or "No Title").strip()
               link = (item.locator('cite').inner_text() or "").strip()
               desc = (item.locator('p').inner_text() or "No Description").strip()
    
               results.append({
                 "title": title, 
                 "link": link, 
                 "description": desc, 
                 "type": "Onion Service", 
                  "source": "Ahmia Index"
                })
            except:
               continue
            
        if not results:
            content = page_instance.content()
            found_onions = re.findall(r'[a-z2-7]{16,56}\.onion', content)
            for onion in list(set(found_onions)):
                results.append({"title": "Discovered Onion Link", "link": f"http://{onion}", "description": f"Raw discovery via regex", "type": "Raw Discovery", "source": "Ahmia Search"})
                
        return results
    except:
        return []

def classify_site(link, title):
    link_lower = link.lower() if link else ''
    title_lower = title.lower() if title else ''
    social_sites = {
        "Facebook": ["facebook.com", "facebook", "fb.com", "fb.watch"],
        "YouTube": ["youtube.com", "youtube", "youtu.be", "yt"],
        "Telegram": ["telegram.org", "t.me", "telegram", "tgm"],
        "Twitter": ["twitter.com", "x.com", "t.co"],
        "Instagram": ["instagram.com", "instagr.am"],
        "TikTok": ["tiktok.com", "douyin.com"],
        "LinkedIn": ["linkedin.com", "lnkd.in"],
        "Reddit": ["reddit.com", "redd.it"],
        "Pinterest": ["pinterest.com", "pin.it"]
    }
    for site, keywords in social_sites.items():
        if any(k in link_lower or k in title_lower for k in keywords): return site
    if any(k in link_lower for k in ["github.com", "stackoverflow.com"]): return "Developer"
    if any(k in link_lower for k in ["udemy.com", "coursera.org"]): return "Udemy"
    if "@" in link_lower or "mail" in title_lower: return "Emails"
    if any(k in link_lower or k in title_lower for k in ['phone', 'mobile', 'رقم']): return "Phone Numbers"
    return "Websites"

def osint_ex(query, num_pages):
    try:
        num_pages = int(num_pages)
        with sync_playwright() as pr:
            browser = pr.chromium.launch(headless=False) 
            context = browser.new_context(user_agent=random.choice(USER_AGENTS))
            page = context.new_page()
            search_link = f"https://duckduckgo.com/?q={query}&t=h_&ia=web"
            page.goto(search_link, timeout=60000, wait_until='networkidle')
            
            all_results = []
            seen_links = set()
            for i in range(num_pages):
                page.wait_for_selector('article, [data-testid="result"]', timeout=30000)
                results = page.query_selector_all('article[data-testid="result"]')
                
                for result in results:
                    try:
                        title_el = result.query_selector('h2 a')
                        if title_el:
                            link = title_el.get_attribute('href')
                            if link not in seen_links:
                                title = (title_el.inner_text() or "").strip()
                                desc_el = result.query_selector('.Og39S6U96996pLw5yveC, [data-result="snippet"]')
                                description = (desc_el.inner_text() if desc_el else "").strip()
                                all_results.append({"title": title, "link": link, "description": description, "type": classify_site(link, title)})
                                seen_links.add(link)
                    except: continue
                if i < num_pages - 1:
                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                    page.wait_for_timeout(random.uniform(2, 4) * 1000)
                    next_btn = page.query_selector('button#more-results')
                    if next_btn:
                        next_btn.click()
                        try: page.wait_for_load_state('networkidle', timeout=10000)
                        except: pass 
                    else: break
            browser.close()
            return all_results
    except Exception as e:
        print(f'Error found: {e}')   
        return []

@app.route('/')
def index():
    return render_template("index.html")




@app.route('/check_tor', methods=["GET"])
def check_tor_status():
    for port in ["9150", "9050"]:
        try:
            proxies = {'http': f'socks5h://127.0.0.1:{port}', 'https': f'socks5h://127.0.0.1:{port}'}
            resp = requests.get("https://check.torproject.org", proxies=proxies, timeout=5)
            if "Congratulations" in resp.text:
                ip = re.search(r'<strong>(.*?)</strong>', resp.text)
                return jsonify({"status": "connected", "ip": ip.group(1) if ip else "185.220.101.19"})
        except: continue 
    return jsonify({"status": "disconnected"})



@app.route('/search', methods=["POST"])
def search():
    query = request.form.get("query")
    depth = int(request.form.get("depth", 2))
    country_code = request.form.get("country", "GLOBAL")
    onion_mode = request.form.get("onion_mode") == "true" 

    results = []
    

    if onion_mode:
        print(f"🕵️ Starting Deep Scan for: {query} across all listed onion sites...")
        current_port = "9150"
        with sync_playwright() as p:
            try:
                browser = p.chromium.launch(headless=True) 
                context = browser.new_context(
                    user_agent=random.choice(USER_AGENTS),
                    proxy={"server": f"socks5://127.0.0.1:{current_port}"},
                    ignore_https_errors=True
                )
                page = context.new_page()
                
                print("[*] Checking Tor...")
                try:
                    page.goto("https://check.torproject.org", timeout=120000)
                    if "Congratulations" not in page.content():
                        print("❌ Tor NOT secured on 9150, trying 9050...")
                        current_port = "9050"
                except:
                    print("⚠️ Tor Check Page Timeout")

                print("[+] Tor tunnel established. Initiating target site scan...")
                results.extend(scrape_ahmia_onion(query, page))
                
                for site_name, info in TARGET_ONION_SITES.items():
                    try:
                        base_url = info['url'].strip()
                        if info.get('search_path'):
                            path = info['search_path'].format(query=query)
                            final_url = f"{base_url.rstrip('/')}/{path.lstrip('/')}"
                        else:
                            final_url = base_url

                        print(f"🔗 Visiting: {site_name} -> {final_url}")
                        page.goto(final_url, timeout=95000, wait_until='domcontentloaded')
                        
                        if "Seized" in (page.title() or ""): continue
                        if info.get('search_path') and info.get('selector'):
                            try:
                                page.wait_for_selector(info['selector'], timeout=15000)
                                items = page.locator(info['selector']).all()
                                for item in items:
                                    text_content = (item.inner_text() or "").strip()
                                    if query.lower() in text_content.lower():
                                        results.append({"title": f"Match from {site_name}", "link": final_url, "description": text_content[:400] + "...", "type": "Internal Site Search", "source": site_name})
                            except: print(f"⚠️ No results visible on {site_name}")
                        else:
                            all_links = page.query_selector_all('a')
                            for link_el in all_links:
                                link_text = (link_el.inner_text() or "").strip()
                                href = link_el.get_attribute('href')
                                if href and query.lower() in link_text.lower():
                                    full_link = href if href.startswith('http') else base_url.rstrip('/') + '/' + href.lstrip('/')
                                    results.append({"title": f"Discovered on {site_name}: {link_text}", "link": full_link, "description": "Internal link found.", "type": "Directory Discovery", "source": site_name})
                    except Exception as e: print(f"❌ Failed to reach {site_name}: {e}"); continue
                browser.close()
            except Exception as global_e:
                print(f"❌ Global Tor Error: {global_e}")
                return jsonify({"error": str(global_e)}), 500
    else:
        print(f"🔍 [NORMAL MODE] Searching for: {query}...")
        try:
            results = osint_ex(query, depth)
        except Exception as normal_e:
            print(f"❌ Normal Scan Error: {normal_e}")
            results = []

    
    COUNTRY_REGEX = {"EG": r'(?:\+20|0)?1[0125]\d{8}', "SA": r'(?:\+966|0)?5\d{8}', "US": r'(?:\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', "GLOBAL": r'\+?\(?\d{1,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,9}'}
    selected_phone_regex = COUNTRY_REGEX.get(country_code, COUNTRY_REGEX['GLOBAL'])
    email_regex = r'[a-zA-Z0-9\._%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}'
    btc_eth_regex = r'\b(?:bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}\b|\b0x[a-fA-F0-9]{40}\b'
    hash_regex = r'\b[a-fA-F0-9]{32}\b|\b[a-fA-F0-9]{40}\b|\b[a-fA-F0-9]{64}\b'
    db_keywords = r'(?i)(\.sql|\.db|\.sqlite|index of|database|dump)'
    pass_keywords = r'(?i)(password|pwd|credential|leak|combo)'
    
    
    all_emails, all_phones, all_wallets, all_hashes = set(), set(), set(), set()
    pass_count, db_count = 0, 0

    for item in results:
        full_text = f"{item.get('title', '')} {item.get('description', '')} {item.get('link', '')}"
        
        f_emails = set(re.findall(email_regex, full_text))
        f_phones = set(re.findall(selected_phone_regex, full_text))
        f_wallets = set(re.findall(btc_eth_regex, full_text))
        f_hashes = set(re.findall(hash_regex, full_text))

        if (f_emails or f_hashes or f_wallets):
            if re.search(pass_keywords, full_text): pass_count += 1
            if re.search(db_keywords, full_text): db_count += 1

        
        all_emails.update(f_emails)
        all_phones.update(f_phones)
        all_wallets.update(f_wallets)
        all_hashes.update(f_hashes)

        
        item.update({
            'emails': list(f_emails), 
            'phones': list(f_phones), 
            'wallets': list(f_wallets), 
            'hashes': list(f_hashes)
        })

   
    if onion_mode:
       results = [r for r in results if any([r.get('emails'), r.get('hashes'), r.get('wallets')]) or ".onion" in str(r.get('link')).lower()]

   
    return jsonify({
        "results": results,
        "stats": {
            "emails": list(all_emails),
            "emails_count": len(all_emails),
            "phones": list(all_phones),
            "phones_count": len(all_phones),
            "wallets": list(all_wallets),
            "wallets_count": len(all_wallets),
            "hashes": list(all_hashes),
            "hashes_count": len(all_hashes),
            "pass_count": pass_count,
            "db_count": db_count,
            "total_nodes": len(results)
        }
    })

@app.route('/check_username', methods=["POST"])
def check_username():
    username = request.form.get("username")
    targets_json = request.form.get("targets") 
    
    if not username: 
        return jsonify({"error": "No username provided"}), 400

    if targets_json:
        try:
            raw_targets = json.loads(targets_json)
            targets = {item['name']: item['url'].replace('{}', username) for item in raw_targets}
        except Exception as e:
            return jsonify({"error": f"Invalid targets format: {e}"}), 400
    else:
        targets = {"GitHub": f"https://github.com/{username}", "Instagram": f"https://www.instagram.com/{username}/"}

    
    def generate_results():
        headers = {"User-Agent": random.choice(USER_AGENTS)}
        print(f"🚀 [HUNTER_MODE] Searching for '{username}'...")

        for site, url in targets.items():
            status = "error"
            try:
                response = requests.get(url, headers=headers, timeout=5, allow_redirects=True)
                if response.status_code == 200:
                    status = "found"
                elif response.status_code == 404:
                    status = "not_found"
                else:
                    status = "uncertain"
                
                print(f"{site}: {status}")
            except Exception:
                status = "error"
                print(f"{site}: Connection Error")

            
            result_data = {
                "site": site, 
                "url": url, 
                "status": status,
                "is_finished": False
            }
            yield json.dumps(result_data) + "\n"

        
        yield json.dumps({"is_finished": True}) + "\n"

    return Response(generate_results(), mimetype='text/event-stream')




active_users = {} 
SESSION_TIMEOUT = 300 # 5 دقائق لو اليوزر ملمسش الموقع يعتبر خارج

def update_active_users():
    """تنظيف القائمة من الناس اللي قفلت أو خملت"""
    current_time = time.time()
    to_remove = [ip for ip, last_seen in active_users.items() if current_time - last_seen > SESSION_TIMEOUT]
    for ip in to_remove:
        del active_users[ip]

@app.before_request
def track_users():
    """كل طلب يجي للسيرفر يسجل الـ IP ووقت الطلب"""
    update_active_users()
    if request.endpoint != 'get_status': # مش بنعد البوت وهو بيشيك
        active_users[request.remote_addr] = time.time()

@app.route('/server_status_70sny', methods=['GET'])
def get_status():
    update_active_users()
    return jsonify({
        "status": "online",
        "current_sessions": len(active_users),
        "max_capacity": 4
    })












app = app
if __name__ == '__main__':
   
    app.run(debug=False, use_reloader=False)
    