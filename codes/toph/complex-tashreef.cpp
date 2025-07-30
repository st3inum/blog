#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int mod = 1e9 + 7;

// find maximum such i such that 2^i<=n
ll log2(ll n) {
	int j = 0;
	for (ll i = 1; i <= n; i *= 2, j++);
	return j - 1;
}
int expo(ll n) {
	if (n == 0)return 1;
	ll j = log2(n), p = (1LL << j) - 1, q = n - p - 1;
	if (p == q)return (3LL * expo(p)) % mod;
	else return (expo(p) + 2LL * expo(q)) % mod;
}
int S(ll n) {
	// calculate (n+1)*(n+2)/2
	ll a = 1;
	if ((n + 1) % 2 == 0) a *= ((n + 1) / 2) % mod; else a *= (n + 1) % mod;
	if ((n + 2) % 2 == 0) a *= ((n + 2) / 2) % mod; else a *= (n + 2) % mod;
	a -= expo(n); a %= mod; if (a < 0)a += mod;
	return a;
}
int S(ll l, ll r) {
	if (l == 0)return S(r);
	return (S(r) - S(l - 1) + mod) % mod;
}
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t, tc = 1; cin >> t; while (t--) {
		ll l, r; cin >> l >> r;
		cout << "Case " << tc++ << ": " << S(l, r) << '\n';
	}
}
