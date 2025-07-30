#include <bits/stdc++.h>
using namespace std;


const int mx = 1e5 + 10;
int f[mx];

bool isprime(int n) {
	if(n <= 1) return 0;
	if(n < mx) return !f[n];
	for(int i = 2; i * i <= n; i++) {
		if(n % i == 0) return 0;
	}
	return 1;
}

const int maxn=300;
vector<int> adj[maxn]; 
int vis[maxn], match[maxn], iter; 
int dfs(int u) {
    if(vis[u] == iter) return 0;
    vis[u] = iter; 
    for(int v : adj[u]) {
        if(match[v] < 0 || dfs(match[v])) {
            match[u] = v, match[v] = u;
            return 1; 
        }
    } return 0; 
}
int kuhn(int n) {
    memset(match, -1, sizeof match);
    memset(vis, 0, sizeof vis);
    iter = 0;
    int ans = 0;  
    for(int i = 0; i < n; i++) {
        ++iter; ans += dfs(i); 
    } return ans; 
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	for(int i = 2; i < mx; i++) {
		if(f[i]) continue;
		for(int j = i + i; j < mx; j += i) {
			f[j] = 1;
		}
	}
	int t; cin >> t; while(t--) {
		// int n; cin >> n;
		int n = rand() % 10 + 4;
		cout << n << ": ";
		if(n == 2 || n == 3) {
			cout << -1 << '\n';
		} else {
			for(int i = 1; i <= n; i++) {
				for(int j = 1 + n; j <= n + n; j++) {
					int d = abs((j - n) - i);
					if(isprime(d)) {
						adj[i].push_back(j);
					}
				}
			}
			if(kuhn(n + n) != n) {
				cout << -1 << '\n';
			} else {
				for(int i = 1; i <= n; i++) {
					cout << match[i] - n << " \n"[i == n];
				}
			}
			for(int i = 1; i <= n; i++) {
				adj[i].clear();
			}
		}
	}
	return 0;
}