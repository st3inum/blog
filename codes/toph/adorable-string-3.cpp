#include <bits/stdc++.h>
using namespace std;

bool isvowel(char ch) {
	return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';
}
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t; cin >> t; while (t--) {
		int n; string s; cin >> n >> s;

		long long ans = 0;
		unordered_map<int, int> cnt;
		int la = 0, ra = n - 1, lb = 1, rb = n;
		for (int j = min(la, lb), V = 0; j <= rb; j++) {
			if (j - 1 >= 0)V += isvowel(s[j - 1]);
			int A = 2 * V - j, B = 2 * V - j + 1;
			if (lb <= j && j <= rb)ans += cnt[B];
			if (la <= j && j <= ra)cnt[A]++;
		}
		cout << ans << '\n';
	}
}