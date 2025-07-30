#include <bits/stdc++.h>
using namespace std;

#define ll long long
struct Hash {
	struct base {
		string s; int b, mod;
		vector<int> hash, p;
		void init(string &_s, int _b, int _mod) { // b > 26, prime.
			s = _s; b = _b, mod = _mod;
			hash.resize(s.size());
			p.resize(s.size());
			hash[0] = s[0]; p[0] = 1;
			for (int i = 1; i < (int)s.size(); ++i) {
				hash[i] = ((ll) hash[i - 1] * b + s[i]) % mod;
				p[i] = (ll) p[i - 1] * b % mod;
			}
		}
		int get(int l, int r) {
			if(l - 1 == r) return 0;
			int ret = hash[r];
			if (l) ret -= (ll) hash[l - 1] * p[r - l + 1] % mod;
			if (ret < 0) ret += mod;
			return ret;
		}
	} h[2];
	void init(string &s) {
		h[0].init(s, 29, 1e9 + 7);
		h[1].init(s, 31, 1e9 + 9);
	}
	pair<int, int> get(int l, int r) {
		return { h[0].get(l, r), h[1].get(l, r) };
	}
} T, W;

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	string t, w; while(cin >> t >> w) {
		T.init(t); W.init(w);
		vector<int> wildcard_position;
		for(int i = 0; i < (int)w.size(); i++) {
			if(w[i] == '?') wildcard_position.push_back(i);
		}
		wildcard_position.push_back((int)w.size());
		int c = 0;
		for(int i = 0; i + (int)w.size() <= (int)t.size(); i++) {
			int ok = 1;
			for(int j = 0, l = 0; j < (int)wildcard_position.size(); j++) {
				int r = wildcard_position[j] - 1;
				if(T.get(i + l, i + r) != W.get(l, r)) {
					ok = 0;
					break;
				}
				l = r + 2;
			}
			c += ok;
		}
		cout << c << '\n';
	}
	return 0;
}