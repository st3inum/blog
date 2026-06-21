#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define ull unsigned ll
#define lll __int128
#define ulll unsigned lll

auto random_address = [] { char *p = new char; delete p; return uint64_t(p); };
const uint64_t SEED = chrono::steady_clock::now().time_since_epoch().count() * (random_address() | 1);
mt19937_64 rng(SEED);

ull pow(ull a, ull t, ull mod) {
	ull r = 1; if (a == 0)return 0;
	for (a %= mod; t; t >>= 1, a = (ulll)a * a % mod)if (t & 1)r = (ulll)r * a % mod; return r;
}
bool isprime(ull n) {
	if (n < 2 || n % 6 % 4 != 1)return (n | 1) == 3;
	ull A[] = {2, 325, 9375, 28178, 450775, 9780504, 1795265022},
	    s = __builtin_ctzll(n - 1), d = n >> s;
	for (ull a : A) {
		ull p = pow(a % n, d, n), i = s;
		while (p != 1 && p != n - 1 && a % n && i--)p = (ulll)p * p % n;
		if (p != n - 1 && i != s)return 0;
	} return 1;
}

ll brent(ll n) {
	if (n % 2 == 0)return 2;
	ll y = rng() % (n - 1) + 1;
	ll c = rng() % (n - 1) + 1;
	ll m = rng() % (n - 1) + 1;
	ll g = 1, r = 1, q = 1, ys, x;
	while (g == 1) {
		x = y;
		for (int i = 0; i < r; i++)y = ((ulll)y * y + c) % n;
		ll k = 0;
		while (k < r && g == 1) {
			ys = y;
			for (int i = 0; i < min(m, r - k); i++) {
				y = ((ulll)y * y + c) % n;
				q = ((ulll)q * abs(x - y)) % n;
			} g = __gcd(q, n); k = k + m;
		} r *= 2;
	}
	if (g == n) {
		while (true) {
			ys = ((ulll)ys * ys + c) % n;
			g = __gcd(abs(x - ys), n);
			if (g > 1)break;
		}
	} return g;
}

set<ll> cnt;
void dfs(ll n) {
	if (n == 1)return;
	if (isprime(n))cnt.insert(n);
	else {
		ll d = brent(n);
		dfs(d);
		dfs(n / d);
	}
}

const int mod = 1e9 + 7;
struct lagrange {
	static const int mod = 1e9 + 7;
	int n; vector<int> y, C;
	lagrange() {}
	lagrange(int n, vector<int> y): n(n), y(y) {
		C.resize(n + 1);
		vector<int> inv(n + 1); int f = 1;
		for (int i = 1; i <= n; i++)f = 1LL * f * i % mod;
		inv[n] = pow(f, mod - 2, mod);
		for (int i = n; i; i--)inv[i - 1] = 1LL * inv[i] * i % mod;
		for (int i = 0; i <= n; i++) {
			C[i] = 1LL * inv[i] * inv[n - i] % mod;
			if ((n - i) & 1)C[i] = mod - C[i];
		}
	}
	int eval(ll x) {
		x = x % mod; if (x < 0)x += mod;
		if (x >= 0 && x <= n)return y[x];
		vector<int> l(n + 1), r(n + 1);
		for (int i = 0, j = n, p = 1, q = 1; i <= n; i++, j--)
			l[i] = p, r[j] = q, p = 1LL * p * (x - i) % mod, q = 1LL * q * (x - j) % mod;
		ll ret = 0; for (int i = 0; i <= n; i++)
			ret = (ret + 1LL * l[i] * r[i] % mod * C[i] % mod * y[i] % mod) % mod;
		if (ret < 0)ret += mod; return ret;
	}
};

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t; cin >> t; while (t--) {
		ll n, k, s = 0, ans = 0; cin >> n >> k;
		vector<int> y(k + 2);
		for (int i = 0; i <= k + 1; i++) {
			s += pow(i, k, mod);
			if (s >= mod)s -= mod;
			y[i] = s;
		}
		lagrange l(k + 1, y);
		cnt.clear();
		dfs(n);
		vector<ll> p(cnt.begin(), cnt.end());
		for (int i = 0, sz = p.size(); i < (1 << sz); i++) {
			s = 1; int cc = 0;
			for (int j = 0; j < sz; j++) {
				if (i & (1 << j)) {
					s *= p[j];
					cc++;
				}
			}
			if (cc & 1)ans -= 1LL * pow(s, k, mod) * l.eval(n / s) % mod;
			else ans += 1LL * pow(s, k, mod) * l.eval(n / s) % mod;
			if (ans >= mod)ans -= mod;
			if (ans < 0)ans += mod;
		}
		cout << ans << '\n';
	}
}
