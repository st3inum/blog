#include <bits/stdc++.h>
using namespace std;

#define ll long long
const int mod = 1000009, mx = mod + 2;

// sum from 1 to n
int sum(int n) {
	return (1LL * n * (n + 1) / 2) % mod;
}
// sum from l to r
int sum(int l, int r) {
	return (sum(r) - sum(l - 1) + mod) % mod;
}
// sum of sum of divisor of all number from 1 to n
int ssod(int n) {
	int s = 0;
	for (int i = 1, la; i <= n; i = la + 1) {
		la = n / (n / i);
		s = (s + 1LL * sum(i, la) * (n / i)) % mod;
	} return s;
}

int query(int n) {
	int x = ssod(n);
	if (n > 0) {
		x = (1LL * x - sum(1, n) - (n - 1)) % mod;
		if (x < 0)x += mod;
	} return x;
}
int f[mx];
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	// sieve for sum of all prime factor or j
	for (int i = 2; i < mx; i++) {
		if (!f[i]) {
			for (int j = i, k = 1; j < mx; j += i, k++) {
				f[j] = i + f[k];
			}
		}
	}

	int t, tc = 1; cin >> t; while (t--) {
		int n; cin >> n;
		cout << "Case " << tc++ << ": " << f[query(n)] % mod << '\n';
	}
}